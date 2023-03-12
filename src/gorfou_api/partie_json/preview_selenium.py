
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import subprocess
import re
import time
import logging
logging.basicConfig(level=logging.ERROR)
module_logger = logging.getLogger(__name__)


def main():

    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    jupyter_server = subprocess.Popen(
        [powershell, 'jupyter', 'notebook', '--no-browser', '--port=8099'], stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)

    time.sleep(2)

    logging.info(get_token())
    driver = webdriver.Chrome(service=ChromeService(
        ChromeDriverManager().install()))

    driver.get(
        "http://localhost:8099/tree/src/gorfou_api/notebooks/test_notebook.ipynb" + get_token())

    input("input quoi que ce soit pour fermer le serveur jupyter")

    subprocess.run(
        [powershell, 'jupyter', 'notebook', 'stop', '8099'], stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)

    jupyter_server.kill()

    print("serveur bien fermé !")


def run_server():
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    subprocess.run(
        [powershell, 'jupyter', 'notebook'])
    print("t1")


def get_token() -> str:
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    server_launch = subprocess.run(
        [powershell, "jupyter", "notebook", "list"], capture_output=True)

    module_logger.info(f"return of powershell command {server_launch.stdout}")

    command_result = server_launch.stdout.decode("ascii")
    token_search = re.search("\?token=[\w]+", command_result)
    if token_search == None:
        raise LookupError("token not found !")
    module_logger.info("token found !")

    return token_search.group(0)


if __name__ == "__main__":
    main()
