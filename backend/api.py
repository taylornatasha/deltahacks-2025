from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from updateJson import write_habit, read_habits, increase_xp

app = Flask(__name__)
CORS(app)

# reset csv on startup lol
f = open("habits.json", "w")
f.truncate()
f.close()

@app.route("/", methods=["GET"])
def handle_get_request():
    habits = read_habits()
    return(habits)

@app.route('/api', methods=['POST'])
def handle_post_request():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    data = data.get('param', None)
    print(data)
    write_habit(data)

    return jsonify({"success": "probably good!"}), 200

@app.route('/api/increase_xp', methods=['POST'])
def handle_increase_xp():
    data = request.get_json()  # Parse the incoming JSON data
    data = data.get('param', None)
    if not data or 'habit' not in data:
        return jsonify({"error": "Invalid request: 'habit' is required"}), 400
    try:
        increase_xp(data['habit'])
        return jsonify({"success": f"XP increased for habit '{data['habit']}'"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)