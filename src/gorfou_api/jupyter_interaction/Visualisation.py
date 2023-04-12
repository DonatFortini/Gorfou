import Notebook
import pandas as pd

def parse_model(set:pd.DataFrame,target:str,nom:str,*cols:str)->tuple:
    x={}
    for elem in cols:
        x[elem]='mean'
    return set[target],set.groupby(nom).agg(x)


Nb = Notebook.Notebook('test')

def group_by(donnees:pd.DataFrame):
    Nb.append_cell(2, [
        "from Visualisation import parse_model"
    ])
    Nb.add_cell([
        f"data={donnees}",
        ""
    ])