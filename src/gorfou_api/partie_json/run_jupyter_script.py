import subprocess

powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'

subprocess.run(f'{powershell} jupyter notebook src/gorfou_api/partie_json/base_notebook.ipynb')