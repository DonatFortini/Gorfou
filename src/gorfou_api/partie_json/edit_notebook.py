from pathlib import PurePath
from pathlib import Path
import json
import pprint
import papermill as pm


path = Path(__file__).resolve()

path = path.parents[1] / Path('./partie_json/base_notebook.ipynb')


with open(path, 'r') as file:
    data = json.load(file)
    pprint.pp(data)
    
    data['cells'][1]['source'] = 'print("aaaaaaaa")'

with open(path,  'w') as file:
    json.dump(data, file, indent=2)


path_result = path.parents[1] / Path('./partie_json/notebook_execute.ipynb')
pm.execute_notebook(path, path)