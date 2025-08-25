"""Minimal Flask API for quick chatbot echo testing.

Run: python TestFlaskAPI.py
Endpoint: POST /chat  JSON {"message": "..."}
Returns: {"text": "short reply"}
"""

from __future__ import annotations

import os
from datetime import datetime
from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple keyword -> reply map (short & direct)
RESPONSES = {
    "xin chào": "Chào bạn, cần hỗ trợ gì?",
    "hello": "Hi, how can I help?",
    "giúp tôi": "Bạn cần giúp về việc làm hay CV?",
    "cv": "Bạn muốn tạo mới hay cải thiện CV?",
    "việc làm": "Bạn tìm việc lĩnh vực nào?",
    "job": "What field are you targeting?",
    "tạm biệt": "Tạm biệt 👋",
    "bye": "Goodbye 👋",
}

def short_reply(message: str) -> str:
    lowerMessage = message.lower()
    
    # Tìm exact match trước
    if lowerMessage in RESPONSES:
        return RESPONSES[lowerMessage]
    
    # Tìm partial match
    for key, value in RESPONSES.items():
        if key in lowerMessage:
            return value
    
    # Default response
    return "Cho biết bạn muốn tìm việc, tạo CV hay hỏi gì cụ thể. + user message: {}".format(message)

@app.after_request
def after_request(response):
    # Add CORS headers manually
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({}), 200
    
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")
    reply = short_reply(message)
    
    print(f"Received: {message}")
    print(f"Reply: {reply}")
    
    return jsonify({
        "text": reply,
        "received": message,
        "ts": datetime.utcnow().isoformat() + "Z"
    })

@app.route("/ping", methods=["GET"])
def ping():  # health check
    return {"status": "ok", "message": "Chatbot API is running"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3001))
    print(f"Starting Flask chatbot API on port {port}")
    print(f"CORS enabled for http://localhost:3000")
    # host=0.0.0.0 so client (e.g. frontend in docker) can reach it
    app.run(host="0.0.0.0", port=port, debug=True)
