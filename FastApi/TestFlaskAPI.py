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

def agent_reply(message: str) -> str:
    lowerMessage = message.lower()
    
    # Agent mode - more detailed and action-oriented responses
    if any(word in lowerMessage for word in ["tạo cv", "create cv", "làm cv"]):
        return "Tôi có thể giúp bạn tạo CV chuyên nghiệp. Hãy cho tôi biết: 1) Ngành nghề bạn quan tâm 2) Kinh nghiệm làm việc 3) Kỹ năng chính của bạn. Sau đó tôi sẽ tạo template CV phù hợp."
    
    if any(word in lowerMessage for word in ["tìm việc", "job search", "find job"]):
        return "Tôi sẽ giúp bạn tìm việc làm phù hợp. Vui lòng cung cấp: 1) Vị trí mong muốn 2) Địa điểm làm việc 3) Mức lương kỳ vọng 4) Kinh nghiệm. Tôi sẽ tìm kiếm và gợi ý các cơ hội việc làm tốt nhất."
    
    if any(word in lowerMessage for word in ["phỏng vấn", "interview"]):
        return "Tôi có thể giúp bạn chuẩn bị phỏng vấn hiệu quả: 1) Phân tích job description 2) Chuẩn bị câu trả lời cho các câu hỏi thường gặp 3) Luyện tập mock interview 4) Tư vấn trang phục và cách ứng xử."
    
    if any(word in lowerMessage for word in ["công ty", "company"]):
        return "Tôi có thể hỗ trợ nghiên cứu công ty: 1) Phân tích thông tin doanh nghiệp 2) Tìm hiểu văn hóa công ty 3) Đánh giá cơ hội phát triển 4) So sánh với các đối thủ trong ngành."
    
    # Default agent response
    return "Với tư cách là AI Agent, tôi có thể thực hiện các tác vụ phức tạp như: tạo CV, tìm việc làm, chuẩn bị phỏng vấn, nghiên cứu công ty. Bạn muốn tôi giúp gì cụ thể? Message: {}".format(message)

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
    
    print(f"Received (ASK): {message}")
    print(f"Reply: {reply}")
    
    return jsonify({
        "text": reply,
        "received": message,
        "mode": "ask",
        "ts": datetime.utcnow().isoformat() + "Z"
    })

@app.route("/agent", methods=["POST", "OPTIONS"])
def agent():
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({}), 200
    
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")
    # Agent mode - more complex responses
    reply = agent_reply(message)
    
    print(f"Received (AGENT): {message}")
    print(f"Reply: {reply}")
    
    return jsonify({
        "text": reply,
        "received": message,
        "mode": "agent", 
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
