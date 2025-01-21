from flask import Flask, request, jsonify
from flask_cors import CORS  
import google.generativeai as ai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()


API_KEY = os.getenv('API_KEY') 

ai.configure(api_key=API_KEY)

model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

@app.route('/chat', methods=['POST'])
def chat_route():
    message = request.json.get('message')
    
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = chat.send_message(message)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
