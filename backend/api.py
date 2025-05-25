from flask import Blueprint, request, jsonify
from retrieval_system import retrieval
import re

api = Blueprint('api', __name__)

# Save user input in memory here
submission = []

# API routes for handling vehicle submissions and queries
@api.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()

    vin = data.get('vin')
    make = data.get('make')
    model = data.get('model')
    year = data.get('year')

    if vin:
        submission.append({"type": "vin", "vin": vin})
        print(submission)
        return jsonify({"message": "VIN submitted successfully"}), 200
    
    if make and model and year:
        submission.append({
            "type": "details",
            "make": make,
            "model": model,
            "year": year
        })
        print(submission)
        return jsonify({"message": "Vehicle details submitted successfully"}), 200
    
    return jsonify({"error": "Invalid data"}), 400

# API route for querying diagnostic reports
@api.route('/query', methods=['GET'])
def query():
    problem = request.args.get('problem')
    
    if not problem:
        return jsonify({"error": "Problem parameter is required"}), 400 
    
    try:
        diagnostic_report = retrieval.ask_gemini(problem.lower())
        parsed = parse_diagnostic_report(diagnostic_report)
        print(parsed)
        return jsonify(parsed), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    

def parse_diagnostic_report(text):
    result = {
        "urgency": "",
        "urgency_reason": "",
        "likely_problem": "",
        "possible_causes": [],
        "self_checks": []
    }

    # Extract Urgency Level and Reason
    urgency_match = re.search(r"\*\*Urgency Level:\*\*\s*(.+?)\n\*Reason:\*\s*(.+?)(?=\n\n|\n\*\*|$)", text, re.DOTALL)
    if urgency_match:
        result["urgency"] = urgency_match.group(1).strip()
        result["urgency_reason"] = urgency_match.group(2).strip()

    # Extract Likely Problem
    likely_match = re.search(r"\*\*Likely Problem:\*\*\s*(.+?)(?=\n\n|\n\*\*|$)", text, re.DOTALL)
    if likely_match:
        result["likely_problem"] = likely_match.group(1).strip()

    # Extract Possible Causes
    causes_match = re.search(r"\*\*Possible Causes:\*\*\s*(.+?)(?=\n\n|\n\*\*|$)", text, re.DOTALL)
    if causes_match:
        raw_causes = causes_match.group(1)
        bullet_points = re.findall(r"\*\*(.+?)\*\*:?\s*(.+)", raw_causes)
        result["possible_causes"] = [{"title": title.strip(), "description": desc.strip()} for title, desc in bullet_points]

    # Extract Self-Check Steps
    self_check_match = re.search(r"\*\*Self-Check Steps:\*\*\s*(.+?)(?=\n\n|\n\*\*|$)", text, re.DOTALL)
    if self_check_match:
        raw_checks = self_check_match.group(1)
        steps = re.findall(r"\d+\.\s+(.*?)(?=\n\d+\.|\Z)", raw_checks, re.DOTALL)
        cleaned_steps = list(dict.fromkeys([step.strip() for step in steps]))  # remove duplicates while preserving order
        result["self_checks"] = cleaned_steps

    return result