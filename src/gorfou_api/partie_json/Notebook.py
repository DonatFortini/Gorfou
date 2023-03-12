from pathlib import Path
import json
import pprint
import papermill as pm


class Notebook:
    """ Classe représentant un notebook jupyter
    """

    path = Path(__file__).resolve()
    DEFAULT_PATH = path.parents[1] / Path('./notebooks/default_notebook.ipynb')

    path_default_content = path.parents[1] / \
        Path('./notebooks/default_content.ipynb')
    with open(path_default_content, 'r') as file:
        DEFAULT_CONTENT = json.load(file)

    def __init__(self, path=DEFAULT_PATH, content=DEFAULT_CONTENT) -> None:
        self.path = path
        self.content = content
        self.nb_cells = len(content['cells'])

        with open(self.path, 'w') as file:
            json.dump(content, file, indent=2, ensure_ascii=False)

    def edit_cell(self, cell_index, new_cell_content):
        """ edit une cellule du notebook à partir de son index

        Args:
            cell_nb (int): numéro de la cellule
            new_content (string): contenu à rajouter dans la cellule
        """

        if not 0 <= cell_index <= self.nb_cells:
            raise IndexError("bad cell index")

        with open(self.path, 'r') as file:
            full_content = json.load(file)
            full_content['cells'][cell_index]['source'] = new_cell_content

        with open(self.path, 'w') as file:
            json.dump(full_content, file, indent=2, ensure_ascii=False)

    def run(self):
        """ execute le notebook à l'aide de papermill

        Args:
            output (Path, optional): choix de l'output de l'execution du notebook. Defaults to path.
        """
        pm.execute_notebook(self.path, self.path)

    def __str__(self) -> str:
        """retourne la représentation du notebook à l'aide de pretty print pour le contenu

        Returns:
            str: représentation de l'objet notebook
        """

        repr_path = str(self.path)
        repr_content = pprint.pformat(self.content)
        return f"path = {repr_path}\n\ncontent =\n\n{repr_content}\n\nnb_cells = {self.nb_cells}"


path_fichier = Path(__file__).resolve()
path_test = path_fichier.parents[1] / Path('./notebooks/test_notebook.ipynb')

mon_Notebook = Notebook(path_test)


print(mon_Notebook)

mon_Notebook.edit_cell(1, 'print("hello from a python script !")')
mon_Notebook.run()

print(mon_Notebook)
