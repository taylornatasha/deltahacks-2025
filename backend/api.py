from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from updateJson import write_habit, read_habits, increase_xp, write_battle

app = Flask(__name__)
CORS(app)

# reset csv on startup lol
f = open("habits.json", "w")
f.truncate()
f.close()

f = open("habits_user2.json", "w")
f.truncate()
f.close()

f = open("battle.json", "w")
f.truncate()
f.close()

@app.route("/api/get", methods=["GET"])
def handle_get_request():
    habits = read_habits('habits.json')
    return(habits)

@app.route("/api_user2/get", methods=["GET"])
def handle_get_request_2():
    habits = read_habits('habits_user2.json')
    return(habits)

@app.route("/battles/get", methods=["GET"])
def handle_get_request_battle():
    battle = read_habits('battles.json')
    return(battle)

@app.route('/api/add', methods=['POST'])
def handle_post_request():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    data = data.get('param', None)
    write_habit(data, 'habits.json')

    return jsonify({"success": "probably good!"}), 200

@app.route('/api_user2/add', methods=['POST'])
def handle_post_request_2():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    data = data.get('param', None)
    write_habit(data, 'habits_user2.json')

    return jsonify({"success": "probably good!"}), 200

@app.route('/battles/add', methods=['POST'])
def handle_post_request_battle():
    data = request.get_json()  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    data = data.get('param', None)
    write_battle(data, 'battles.json')

    return jsonify({"success": "probably good!"}), 200

@app.route('/api/increase_xp', methods=['POST'])
def handle_increase_xp():
    data = request.get_json()  # Parse the incoming JSON data
    data = data.get('param', None)
    if not data or 'habit' not in data:
        return jsonify({"error": "Invalid request: 'habit' is required"}), 400
    try:
        increase_xp(data['habit'], 'habits.json')
        return jsonify({"success": f"XP increased for habit '{data['habit']}'"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    
@app.route('/api_user2/increase_xp', methods=['POST'])
def handle_increase_xp_2():
    data = request.get_json()  # Parse the incoming JSON data
    data = data.get('param', None)
    if not data or 'habit' not in data:
        return jsonify({"error": "Invalid request: 'habit' is required"}), 400
    try:
        increase_xp(data['habit'], 'habits_user2.json')
        return jsonify({"success": f"XP increased for habit '{data['habit']}'"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)