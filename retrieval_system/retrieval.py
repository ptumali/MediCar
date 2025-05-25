import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import google.generativeai as genai
import scraper

load_dotenv()
gemini_key = os.getenv("NEXT_PUBLIC_GEMINI_API_KEY")

model_name = 'multi-qa-MiniLM-L6-cos-v1'
model = SentenceTransformer(model_name)
embeddings_file = 'embeddings.pkl'
faiss_file = 'faiss_index.index'

'''Utilities'''
def normalize(embeddings):
    norm = np.linalg.norm(embeddings, axis=1, keepdims=True)
    return embeddings / norm

def store_dirs_list(dirs):
    with open("store_dirs.txt", "w") as f:
        for d in dirs:
            f.write(d + "\n")

def load_dirs_list():
    if os.path.exists("store_dirs.txt"):
        with open("store_dirs.txt", "r") as f:
            return [line.strip() for line in f.readlines()]
    else:
        dirs = scraper.create_files()
        store_dirs_list(dirs)
        return dirs

def read_documents(dirs):
    docs = []
    for folder in dirs:
        for filename in os.listdir(folder):
            if filename.endswith(".txt"):
                path = os.path.join(folder, filename)
                with open(path, "r", encoding="utf-8") as f:
                    docs.append(f.read())
    return docs

'''Embedding and Indexing'''
def build_index():
    dirs = load_dirs_list()
    docs = read_documents(dirs)
    print(f"Encoding {len(docs)} documents...")
    if not docs:
        print("No documents found to index.")
        return None
    
    embeddings = model.encode(docs, convert_to_tensor=False, show_progress_bar=True)
    normalized_embeddings = normalize(embeddings)

    # Dump
    with open(embeddings_file, 'wb') as f:
        pickle.dump((normalized_embeddings, docs), f)

    # Build and save FAISS index
    index = faiss.IndexFlatIP(normalized_embeddings.shape[1])
    index.add(normalized_embeddings)
    faiss.write_index(index, faiss_file)

    print(f"Index built and stored in {faiss_file} with {len(docs)} documents.")
    return normalized_embeddings, index, docs

def load_index():
    if os.path.exists(faiss_file) and os.path.exists(embeddings_file):
        index = faiss.read_index(faiss_file)

        with open(embeddings_file, 'rb') as f:
            normalized_embeddings, docs = pickle.load(f)
        
        print(f"Index loaded from {faiss_file} with {len(docs)} documents.")
        return normalized_embeddings, index, docs
    else:
        print("No index file found. Please build the index first.")
        return build_index()
    
'''Querying'''
def query(query_text, top_k=5):
    _, index, docs = load_index()
    
    if not docs:
        print("No documents available for querying.")
        return []

    query_vector = model.encode([query_text], convert_to_tensor=False)
    normalized_query_vector = normalize(query_vector)

    distances, indices = index.search(normalized_query_vector, top_k)
    
    results = []
    for i in range(len(indices[0])):
        if indices[0][i] != -1:  # Check if the index is valid
            results.append({
                'document': docs[indices[0][i]],
                'distance': distances[0][i]
            })
    
    return results

def ask_gemini(query_text):
    context = query(query_text)
    genai.configure(api_key=gemini_key)
    model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
    prompt = f"""
              You are an expert automotive diagnostic assistant.
              
              A user has reported the following issue with their vehicle:
              **"{query_text}"**
              
              Below is reference material retrieved from trusted automotive sources such as RepairPal and YourMechanic, which may relate to the issue:

            ---
            {'\n\n'.join([item['document'] for item in context])}
            ---

            Using the user’s input and the reference materials, provide a clear and friendly diagnosis report that includes the following:
            1. **Urgency Level** — Indicate the severity using one of the following symbols, along with a short reason:
                - 💥 Critical
                - ⚠️ Needs attention
                - ✅ Safe to monitor
            
            2. **Likely Problem** — In 1–2 concise sentences, explain what the issue is likely to be.
            3. **Possible Causes** — List 1–3 likely causes, each with a simple and clear explanation.
            4. **Self-Check Steps** — Suggest 2–4 easy checks the user can perform on their own to confirm or better understand the issue.

            Keep the tone confident and easy to understand. Use plain language wherever possible. If the context is insufficient to generate a meaningful response, reply with:  
            **"Sorry, I wasn't able to determine the issue based on the provided information."**
            """
    
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    user_query = "Smoke is coming from under the hood of my car"
    answer = ask_gemini(user_query)
    print("\nGemini Response:\n", answer)