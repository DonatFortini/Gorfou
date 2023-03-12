
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import subprocess
import re
import threading
import time


def main():

    # driver = webdriver.Chrome(service=ChromeService(
    # ChromeDriverManager().install()))

    # t_server = threading.Thread(target=run_server, daemon=True)

    # t_server.start()

    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    jupyter_server = subprocess.Popen(
        [powershell, 'jupyter', 'notebook', '--no-browser', '--port=8099'], stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)

    time.sleep(2)

    print(get_token())

    jupyter_server.kill()

    # t_server.join()

    input()

    # t_server.join()

    print("bonjour !")


def run_server():
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    subprocess.run(
        [powershell, 'jupyter', 'notebook'])
    print("t1")


def get_token():
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    p = subprocess.run(
        [powershell, "jupyter", "notebook", "list"], capture_output=True)
    m = re.search("http:////localhost:8099//?token=", p.stdout)

    return "http://localhost:8099/notebooks/base_notebook.ipynb/?"
    # print(str(p.stdout))
    # regex_token = re.compile('token')
    # print(regex_token.match(p.stdout))

    # driver.get("http://localhost:8888/notebooks/base_notebook.ipynb/" + aaaa)


if __name__ == "__main__":
    main()
