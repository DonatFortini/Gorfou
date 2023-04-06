
import jupyter_interaction.JupyterServer as JupyterServer
import jupyter_interaction.Notebook as Notebook
from flask import Flask, request, session
from flask_session import Session
import sys
import logging
import shutil
import os

from jupyter_interaction.Notebook import Notebook
from jupyter_interaction.Modele import random_forest

instance_notebook = Notebook('main')
instance_notebook.save()

# création de l'application flask
app = Flask(__name__)

# création du logger gérant les logs de l'application
handler = logging.StreamHandler(sys.stdout)

# ajout du logger à l'application
app.logger.addHandler(handler)

# configuration de la session flask
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


def main():
    """ fonction principale permettant de lancer le serveur flask
    """
    app.run()


@app.route('/lancement_preview', methods=['POST'])
def lancement_preview():
    """fonction permettant de lancer le serveur jupyter et d'ouvrir un notebook
    """
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    return "preview lancé !"


@app.route('/import_data', methods=['GET', 'POST'])
def import_data():
    """ fonction permettant d'importer des données dans un notebook"""

    request_data = request.get_json()

    file_path = request_data['file_path']
    file_name = request_data['file_name']

    instance_notebook.import_data(file_path, file_name)

    return "import réussi !"


@app.route('/', methods=['GET', 'POST'])
def hello():
    """ simple fonction permettant de tester le serveur à l'aide d'un navigateur
    """
    return "Le serveur marche !"


@app.route('/randForest', methods=['GET', 'POST'])
def test_forest():

    request_data = request.get_json()

    tuple = request_data['tuple']
    tuple2 = request_data['tuple2']

    random_forest(instance_notebook, (tuple, tuple2))
    instance_notebook.save()

    return "insertion reussi"

@app.route('/suppres', methods=['GET', 'POST'])
def suppress():
    shutil.rmtree("src/gorfou_api/notebooks/main_nb_project", ignore_errors=True)
    return "delete"
    


@app.route('/finaliser', methods=['GET', 'POST'])
def finalise():
    #faut internationaliser la 

    source = "src/gorfou_api/notebooks/main_nb_project"
    destination = ""

    home_dir = os.path.expanduser("~")

    if os.name == "nt":  # Windows
        destination = os.path.join(home_dir, "Téléchargements")

    elif os.name == "posix":  # macOS, Linux
        destination = os.path.join(home_dir, "Téléchargements")

    shutil.rmtree(destination, ignore_errors=True)  # efface si deja existant
    # copy le ficher notebook dans le dl de l'user
    shutil.copytree(source, destination)
    # on supprime le dossier source pour la prochaine utilisation
    shutil.rmtree(source, ignore_errors=True)

    return "finaliser reussi"


if __name__ == "__main__":
    main()
