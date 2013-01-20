from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def character_sheet():
    return render_template('character-sheet.html')

if __name__ == '__main__':
    app.run()