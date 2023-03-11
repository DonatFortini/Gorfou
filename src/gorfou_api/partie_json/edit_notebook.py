from pathlib import PurePath
from pathlib import Path
import json


path = Path(__file__).resolve()

path = path.parents[1] / Path('src_app')

with path.open() as file:
    data = file.read()