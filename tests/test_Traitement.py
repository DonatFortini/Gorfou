import gorfou_api.jupyter_interaction.Traitement as Traitement
import pandas as pd
import gorfou_api.jupyter_interaction.Notebook as Notebook
import pytest



def test_verif_integrite():
    nb_test = Notebook.Notebook("test")
    Traitement.verif_integrite(nb_test, "data")

    print(nb_test.content["cells"][2]["source"])

    assert nb_test.content["cells"][2]["source"] == ["data.isnull()"]


def test_replace_missing_val_mean():
    nb_test = Notebook.Notebook("test")
    Traitement.replace_missing_val_mean(nb_test, "data", "var")

    
    assert nb_test.content["cells"][3]["source"] == ["data[var].fillna(data[var].median(), inplace=True)"]


def test_drop_rows_missing_val():
    nb_test = Notebook.Notebook("test")
    Traitement.drop_rows_missing_val(nb_test, "data")

    
    assert nb_test.content["cells"][4]["source"] == ["data.dropna()"]