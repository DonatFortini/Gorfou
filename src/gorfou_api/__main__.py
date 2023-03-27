
import partie_json.JupyterServer as JupyterServer
import partie_json.Notebook as Notebook
from flask import Flask, request, jsonify
app = Flask(__name__)


def main():
    app.run()


@app.route('/preview', methods=['POST'])
def lancement_preview():
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    mon_serveur.stop_server()


@app.route('/import_data', methods=['GET', 'POST'])
def import_data():

    request_data = request.get_json()

    file_path = request_data['file_path']
    file_name = request_data['file_name']

    mon_notebook = Notebook.Notebook("temp")
    mon_notebook.save()
    mon_notebook.import_data(file_path, file_name)

    return "import réussi !"


@app.route('/', methods=['GET', 'POST'])
def hello():
    return "Hello World!"


if __name__ == "__main__":
    main()
