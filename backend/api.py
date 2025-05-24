from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)

# Save user input in memory here
submission = []

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

