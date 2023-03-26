
import sys
import partie_json.JupyterServer as JupyterServer
import partie_json.Notebook as Notebook
from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/preview', methods=['POST'])
def lancement_preview():
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    mon_serveur.stop_server()


@app.route('/import', methods=['POST'])
def import_data():
    path = request.json['filePath']
    name = request.json['fileName']
    mon_notebook = Notebook.Notebook("temp")
    mon_notebook.save()
    mon_notebook.import_data(path, name)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
