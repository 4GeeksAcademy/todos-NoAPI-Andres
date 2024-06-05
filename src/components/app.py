from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

users = {}
todos = {}

#----------------------USER OPERATIONS------------------------# 

@app.route('/users', methods=['GET'])
def get_users():
    users_list = [{"name": user["name"], "id": user["id"]} for user in users.values()]
    response = {"users": users_list}
    return jsonify(response), 200

@app.route('/users/<user_name>', methods=['GET'])
def get_user(user_name):
    user = users.get(user_name)
    if user:
        response = {
            "name": user["name"],
            "todos": user["todos"]
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/user', methods=['POST'])
def create_user():
    user_name = request.json.get('user_name')
    if not user_name or user_name in users:
        return jsonify({'error': 'Username already exists or is invalid'}), 400
    users[user_name] = {
        "name": user_name,
        "id": str(uuid.uuid4()),
        "todos": []
    }
    return jsonify({'message': f'User {user_name} successfully created'}), 201

@app.route('/user/<user_name>', methods=['DELETE'])
def delete_user(user_name):
    if user_name not in users:
        return jsonify({'error': 'User not found'}), 404
    del users[user_name]
    return jsonify({'message': f'User {user_name} deleted successfully'}), 200

#----------------------TODO LIST OPERATIONS------------------------# 

@app.route('/todo', methods=['POST'])
def create_todo():
    user_name = request.json.get('user_name')
    label = request.json.get('label')
    is_done = request.json.get('is_done')
    if not user_name or not label or is_done is None or user_name not in users:
        return jsonify({'error': 'Invalid data or user not found'}), 400
    todo_id = str(uuid.uuid4())
    todo = {'id': todo_id, 'label': label, 'is_done': is_done}
    users[user_name]['todos'].append(todo)
    return jsonify(todo), 201

@app.route('/todo/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.json
    if 'label' not in data or 'is_done' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    for user in users.values():
        for todo in user['todos']:
            if todo['id'] == todo_id:
                todo['label'] = data['label']
                todo['is_done'] = data['is_done']
                return jsonify(todo), 200
    
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/todo/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    for user in users.values():
        for todo in user['todos']:
            if todo['id'] == todo_id:
                user['todos'].remove(todo)
                return jsonify({'message': 'Todo deleted successfully'}), 200
    return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)