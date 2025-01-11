from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def test():
    return [{'name': 'bob', 'xp': 2, 'pokemon': 'pikachu', 'habit': 'spaghetti'}, 
            {'name': 'fred', 'xp': 3, 'pokemon': 'slowbro', 'habit': 'meow'}]

@app.route('/api', methods=['POST'])
def handle_post_request():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    habit = data.get('param', None).get('habit', None)

    print("yay! habit:", habit)

    if habit:
        return jsonify({"status": "success", "message_received": habit}), 200
    else:
        return jsonify({"error": "No 'message' key in the data"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)