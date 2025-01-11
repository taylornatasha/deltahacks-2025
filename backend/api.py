from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def test():
    return [{'name': 'bob', 'xp': 2, 'pokemon': 'pikachu', 'habit': 'spaghetti'}, 
            {'name': 'fred', 'xp': 3, 'pokemon': 'slowbro', 'habit': 'meow'}]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)