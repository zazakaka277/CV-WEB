# My CV Portfolio

HTML, CSS, JavaScript and a small Flask backend. Pages: Home, About (with Experience and Interests), Skills, Education, Projects, Contact.

## Run in VS Code on macOS
1. Install Python 3 (`brew install python`) and open this folder in VS Code.
2. Open the terminal (Ctrl+`) and run:
   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```
   The API runs at http://127.0.0.1:5000. Submissions are saved in `backend/contacts.json`.
3. Open a second terminal in the project root and run `python3 -m http.server 8000`, then visit http://localhost:8000. (A local server is needed so the skills and projects JSON can load. The VS Code "Live Server" extension also works.)

## Make it yours
- Replace "Your Name", email, phone and links in the HTML files.
- Add `assets/images/profile.jpg` (a placeholder shows until you do).
- Edit `data/skills.json` and `data/projects.json`; add project images in `assets/images/projects/`.
- Edit Experience in `about.html` and courses in `education.html`.
- Replace `assets/cv.pdf` with your own CV.
- Colours live at the top of `css/style.css`.
