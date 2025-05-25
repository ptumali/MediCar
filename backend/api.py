from flask import Blueprint, request, jsonify
from retrieval_system import retrieval

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
        
        return jsonify(diagnostic_report), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  