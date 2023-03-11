# selenium 4
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import subprocess
import re

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'

p = subprocess.run(f'{powershell} jupyter notebook list', capture_output=True)


print(str(p.stdout))
regex_token = re.compile('token')
#print(regex_token.match(p.stdout))

#driver.get("http://localhost:8888/notebooks/base_notebook.ipynb/" + aaaa)

#input()