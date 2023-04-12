from pathlib import Path
import json
import pprint
import papermill as pm
import shutil


# définition du chemin par défaut du dossier contenant les notebooks
path = Path(__file__).resolve()
DEFAULT_PARENT_PATH = path.parents[1] / Path('./notebooks/')


class Notebook:
    """ Classe représentant un notebook jupyter """

    # récupération du contenu par défaut d'un notebook
    path = Path(__file__).resolve()
    path_default_content = path.parents[1] / \
        Path('./notebooks/default_content.ipynb')
    with open(path_default_content, 'r') as file:
        DEFAULT_CONTENT = json.load(file)

    def __init__(self, name, parent_path=DEFAULT_PARENT_PATH, content=DEFAULT_CONTENT) -> None:
        """ constructeur de la classe notebook"""

        self.name = name + ".ipynb"
        self.path_directory = parent_path / (name + "_nb_project")
        self.path_notebook = self.path_directory / self.name
        self.content = content

    def save(self):
        """ sauvegarde le notebook dans le dossier parent_path"""
        if not self.path_directory.exists():
            Path.mkdir(self.path_directory)

        with open(self.path_notebook, 'w') as file:
            json.dump(self.content, file, indent=2, ensure_ascii=False)

    def import_data(self, path_to_data, name):
        if not self.path_directory.exists():
            raise FileNotFoundError

        path = Path(path_to_data).resolve()
        shutil.copy(path, self.path_directory / name)

        self.append_cell(1,["import pandas as pd",f"X=pd.read_csv('{path}',sep=';')"])

    def edit_cell(self, cell_index, new_cell_content: list[str]):
        """ edit une cellule du notebook à partir de son index

        Args:
            cell_nb (int): numéro de la cellule
            new_content (list[str]): contenu à rajouter dans la cellule
        """

        if not 0 <= cell_index < len(self.content['cells']):
            raise IndexError("bad cell index")

        if type(new_cell_content) is str:
            raise TypeError("Expected an array of strings")

        self.content['cells'][cell_index]['source'] = new_cell_content

    def add_cell(self, source=[]):
        """ ajoute une nouvelle cellule au notebook

        Args:
            source (list, optional): tableau d'instruction de la nouvelle
            cellule. Defaults to [].
        """
        base_cell = {
            "cell_type": "code",
            "execution_count": len(self.content['cells']),
            "metadata": {},
            "outputs": [],
            "source": source
        }

        self.content['cells'].append(base_cell)

    def check_doublon(self, content: list[str], new_content: list[str]) -> list[str]:
        """compare deux liste,si la liste new_content contient un 
        doublon une nouvelle version de cette derniere est renvoyée
        ,sinon elle renvoit l'originale"""
        doublon = False
        liste_suppression = []
        for elem in new_content:
            if elem in content:
                doublon = True
                liste_suppression.append(elem)
        if not doublon:
            return new_content
        else:
            for elem in liste_suppression:
                if elem in new_content:
                    new_content.remove(elem)
            return new_content

    def append_cell(self, cell_index: int, content: list[str]):
        """permet d'ajouter du code sans ecraser le contenu de la cellule"""
        if not 0 <= cell_index < len(self.content['cells']):
            raise IndexError("bad cell index")

        if type(content) is str:
            raise TypeError("Expected an array of strings")

        self.content['cells'][cell_index]['source'].extend(self.check_doublon(self.content['cells'][cell_index]['source'],content))

    def delete_cell(self, cell_index):
        """supprime une cellule du notebook

        Args:
            cell_index (int): index de la cellule à supprimer
        """
        self.content['cells'].pop(cell_index)

    def delete_save(self):
        """supprime la sauvegarde du notebook"""
        Path.unlink(self.path_notebook / self.name)

    def delete_directory(self):
        """supprime le dossier créé pour contenir le notebook
        """
        Path.rmdir(self.path_directory)

    def run(self):
        """ execute le notebook à l'aide de papermill

        Args:
            output (Path, optional): choix de l'output de l'execution du notebook. Defaults to path.
        """
        pm.execute_notebook(self.path_notebook, self.path_notebook)

    def __str__(self) -> str:
        """retourne la représentation du notebook à l'aide de pretty print pour le contenu

        Returns:
            str: représentation de l'objet notebook
        """

        repr_path = str(self.path_notebook)
        repr_content = pprint.pformat(self.content)
        return f"path = {repr_path}\n\ncontent =\n\n{repr_content}"
