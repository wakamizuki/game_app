import os
from flask import Flask, render_template, url_for
app = Flask(__name__)

# Flaskを開発モードにして、ホットリロードを有効にする
app.config['DEBUG'] = True

@app.route('/')
def hello():
    js_files = os.listdir(os.path.join(app.static_folder, 'js'))
    js_urls = [url_for('static', filename=f'js/{file}') for file in js_files]
    return render_template("index.html", js_urls=js_urls)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
