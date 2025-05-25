import scraper

from sentence_transformers import SentenceTransformer

import os

import faiss

# from openai import OpenAI
import google.generativeai as genai

from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Access environment variables
gemini_key = os.getenv("NEXT_PUBLIC_GEMINI_API_KEY")


def read(dirs):
    docs = []
    docs_path = []

    for i in dirs:
        txt_files = [f for f in os.listdir(i) if f.endswith(".txt")]
    
        for j in txt_files:
            path = os.path.join(i,j)
            with open(path, "r", encoding = "utf-8") as f:
                content = f.read()
                docs.append(content)
                docs_path.append(j)

    return docs
    # print(doc_paths)

def store_dirs_list(dirs):
    
    with open("store_dirs.txt", "w") as f:
        for i in dirs:
            f.write(i + "\n")

def load_dirs_list():
    dirs = []
    if os.path.exists("store_dirs.txt"):
        with open("store_dirs.txt", "r") as f:
            for line in f: 
                # print(line.rstrip('\n'))
                dirs.append(line.strip())
    else:
        dirs = scraper.create_files()
        store_dirs_list(dirs)
    return dirs

def get_embeddings():
    dirs = []

    dirs = load_dirs_list()

    docs = read(dirs)

    model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')

    embeddings = model.encode(docs, convert_to_tensor=False, show_progress_bar=True)

    return embeddings, docs

def query(query):

    embeddings, docs = get_embeddings()
    
    texts = []

    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)

    print(f"Total sentences indexed: {index.ntotal}")

    model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')
    query_embeddings = model.encode([query])

    k = 5
    distances, indices = index.search(query_embeddings, k)

    for i, idx in enumerate(indices[0]):
        texts.append(docs[idx])

    return texts

query_input = "What are the symptoms of a bad alternator?"
context = query(query_input)

genai.configure(api_key=gemini_key)
model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
response = model.generate_content(f"Summarisze this for me: {' '.join(context)}")
print(response.text)

