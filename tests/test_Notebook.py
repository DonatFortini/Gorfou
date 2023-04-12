
from gorfou_api.jupyter_interaction.Notebook import Notebook
from gorfou_api.jupyter_interaction.Modele import random_forest
import pytest


def test_fonction_randomforest_cell():
    nb_test = Notebook('main')
    random_forest(nb_test, (3, 4))
    assert nb_test.content["cells"][1]["source"] == ['print("ce notebook à été créer à l\'aide de garfou !")', "from sklearn.ensemble import RandomForestClassifier",
                                                     "from sklearn.model_selection import cross_val_score"]
    assert nb_test.content["cells"][2]["source"] == ["X,y=(3, 4)",
                                                     "random_forest_classifier=RandomForestClassifier(0)",
                                                     "random_forest_classifier.fit(X,y)",
                                                     "random_forest_classifier.score(X,y),cross_val_score(random_forest_classifier,X,y)"]
def test_edit_cell():
    notebook_test = Notebook.Notebook("aaaa")
    notebook_test.edit_cell(1, ["test"])
    assert notebook_test.content["cells"][1]["source"] == ["test"]

    notebook_test.edit_cell(1, ["test", "test"])
    assert notebook_test.content["cells"][1]["source"] == ["test", "test"]

    with pytest.raises(IndexError):
        notebook_test.edit_cell(-1, ["test"])

    with pytest.raises(IndexError):
        notebook_test.edit_cell(2, ["test"])

    with pytest.raises(TypeError):
        notebook_test.edit_cell(1, "test")

