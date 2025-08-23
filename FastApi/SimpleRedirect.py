from flask import Flask, Response, request
import time
import threading
import msvcrt

app = Flask(__name__)

# biến toàn cục để lưu route cần chuyển hướng
current_path = "/"

@app.route("/navigate")
def navigate():
    def event_stream():
        last_path = None
        global current_path
        while True:
            if current_path != last_path:
                yield f"data: {current_path}\n\n"
                last_path = current_path
            time.sleep(1)
    
    response = Response(event_stream(), mimetype="text/event-stream")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/set_route", methods=["POST"])
def set_route():
    global current_path
    current_path = request.json.get("path", "/")
    return {"status": "ok", "path": current_path}

def keyboard_listener():
    """Lắng nghe phím tắt"""
    global current_path
    print("🎹 Phím tắt: 1=Đăng nhập, 2=Đăng ký, q=Thoát")
    
    while True:
        if msvcrt.kbhit():
            key = msvcrt.getch().decode('utf-8')
            if key == '1':
                current_path = "/userLogin"
                print("🔐 Chuyển đến đăng nhập")
            elif key == '2':
                current_path = "/userRegister"
                print("📝 Chuyển đến đăng ký")
            elif key == 'q':
                break

if __name__ == "__main__":
    # Start keyboard listener in background
    threading.Thread(target=keyboard_listener, daemon=True).start()
    print("🚀 Server: http://localhost:5001")
    app.run(port=5001, debug=True)
