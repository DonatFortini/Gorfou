from pathlib import Path
import json
import pprint
import papermill


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

    def edit_cell(self, cell_index, new_content):
        """ edit une cellule du notebook à partir de son index

        Args:
            cell_nb (int): numéro de la cellule
            new_content (string): contenu à rajouter dans la cellule
        """

        if 0 <= cell_index <= self.nb_cells:
            raise IndexError("bad cell index")

        with open(self.path, 'r') as file:
            new_content = json.load(file)

            new_content['cells'][cell_index]['source'] = new_content

        with open(self.path,  'w') as file:
            file.dump(new_content, file, indent=2)

    def run(self, output=path):
        """ execute le notebook à l'aide de papermill

        Args:
            output (Path, optional): choix de l'output de l'execution du notebook. Defaults to path.
        """
        papermill.execute(self.path, output)

    def __str__(self) -> str:
        """retourne la représentation du notebook à l'aide de pretty print pour le contenu

        Returns:
            str: représentation de l'objet notebook
        """

        repr_path = str(self.path)
        repr_content = pprint.pformat(self.content)
        return f"path = {repr_path}\n\ncontent =\n\n{repr_content}\n\nnb_cells = {self.nb_cells}"


mon_Notebook = Notebook()
print(mon_Notebook)
