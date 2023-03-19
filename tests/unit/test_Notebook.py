
import gorfou_api.partie_json.Notebook as Notebook
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
