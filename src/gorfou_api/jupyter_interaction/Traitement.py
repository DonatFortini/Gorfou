import pandas as pd
from pathlib import Path


#cellule 2 = import
# simple quote dans les strings
#["print('hello')", "le reste du code"]


# path = Path(__file__).resolve()
# PATH_DATASETS = path.parents[2] / Path('./datasets/')


# lecture des données
def lecture_donnees_csv(Notebook, file_name: str):
    #récupère le chemin du fichier

    # file_to_open = PATH_DATASETS / file_name
    Notebook.add_cell(["import pandas as pd",
                 f"data = pd.read_csv({file_name})",
                 "data"])



#vérification intégrité 
def verif_integrite(Notebook, df_name: str):
    """
    vérifie s'il y a des cases vides, NULL, NaN

    df_name : nom de la variable contenant le DataFrame
    
    """
    Notebook.add_cell([f"{df_name}.isnull()"])


def replace_missing_val_mean(Notebook, df_name: str, variable: str):
    Notebook.add_cell([
        f"{df_name}[{variable}].fillna({df_name}[{variable}].median(), inplace=True)"
    ])

def drop_rows_missing_val(Notebook, df_name: str):
    Notebook.add_cell([
        f"{df_name}.dropna()"
    ])
