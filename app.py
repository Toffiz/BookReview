from flask import Flask, request, jsonify
import pyrebase
from firebase_config import config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    try:
        users = db.child("Users").get().val() or {}
        # Check if username or email already exists
        if any(u.get('username') == username or u.get('email') == email for u in users.values()):
            return jsonify({'message': 'Username or email already exists'}), 409

        user_id = db.child("Users").push({
            "username": username,
            "email": email,
            "password": password
        }).get('name')
        return jsonify({'message': 'User registered successfully!', 'userId': user_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    try:
        users = db.child("Users").get().val() or {}
        for user_id, user in users.items():
            if user.get('username') == username and user.get('password') == password:
                return jsonify({'message': 'Login successful'}), 200
        return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
