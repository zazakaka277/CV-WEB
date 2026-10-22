"""Flask backend: saves contact form submissions to contacts.json."""
import json, re, threading
from datetime import datetime
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # lets the HTML pages (another origin) call this API
FILE = Path(__file__).with_name("contacts.json")
lock = threading.Lock()  # prevents two requests writing the file at once

@app.post("/api/contact")
def contact():
    d = request.get_json(silent=True) or {}
    name, email, subject, message = (str(d.get(k, "")).strip() for k in ("name", "email", "subject", "message"))
    if len(name) < 2 or len(subject) < 3 or len(message) < 10 or not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
        return jsonify(error="Please fill in all fields correctly."), 400
    with lock:
        items = json.loads(FILE.read_text("utf-8") or "[]")
        items.append({"name": name, "email": email, "subject": subject, "message": message,
                      "date": datetime.now().isoformat(timespec="seconds")})
        FILE.write_text(json.dumps(items, indent=2, ensure_ascii=False), "utf-8")
    return jsonify(ok=True), 201

if __name__ == "__main__":
    app.run(port=5000, debug=True)
