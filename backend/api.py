from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from csvThings import write_habit, read_habits

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def test():
    return(read_habits())

@app.route('/api', methods=['POST'])
def handle_post_request():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    data = data.get('param', None)

    write_habit(data)

    return jsonify({"success": "probably good!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)