
import sys
import partie_json.JupyterServer as JupyterServer
import partie_json.Notebook as Notebook
from flask import Flask
app = Flask(__name__)


def lancement_preview():
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    mon_serveur.stop_server()


def import_data(path, name):
    mon_notebook = Notebook.Notebook("temp")
    mon_notebook.save()
    mon_notebook.import_data(path, name)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
