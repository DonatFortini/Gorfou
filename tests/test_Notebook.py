
import gorfou_api.jupyter_interaction.Notebook as Notebook
import pytest


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

def test_append_cell():
    nb_test = Notebook.Notebook("bbbb")
    nb_test.append_cell(1, ["test"])
    assert nb_test.content["cells"][1]["source"] == ["test","test","test"]

    nb_test.append_cell(1, ["test", "test"])
    assert nb_test.content["cells"][1]["source"] == ["test","test","test","test","test"]

    with pytest.raises(IndexError):
        nb_test.append_cell(-1, ["test"])

    with pytest.raises(IndexError):
        nb_test.append_cell(2, ["test"])

    with pytest.raises(TypeError):
        nb_test.append_cell(1, "test")
