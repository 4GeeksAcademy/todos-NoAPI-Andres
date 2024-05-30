from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

users = {}
todos = {}

#----------------------USER OPERATIONS------------------------# 

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(list(users.keys())), 200

@app.route('/user', methods=['POST'])
def create_user():
    username = request.json('username')
    if not username or username in users:
        return jsonify({'error': 'Username already exists or is invalid'}), 400
    users[username] = []
    return jsonify({'message': f'User {username} succesfully created'}), 201

@app.route('/user/<username>', methods=['DELETE'])
def delete_user(user_name):
    if username not in users:
        return jsonify({'error': 'User not found'}), 404
    del users[user_name]
    return jsonify({'message': f'User {user_name} deleted succesfully'}), 200

#----------------------TODO LIST OPERATIONS------------------------# 









if __name__ == '__main__':
    app.run(debug=True)