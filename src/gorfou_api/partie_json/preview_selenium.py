
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import subprocess
import re
import time
import logging
module_logger = logging.getLogger(__name__)


def main():

    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    jupyter_server = subprocess.Popen(
        [powershell, 'jupyter', 'notebook', '--no-browser', '--port=8099'], stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)

    time.sleep(2)

    print(get_token())
    driver = webdriver.Chrome(service=ChromeService(
        ChromeDriverManager().install()))

    driver.get("http://localhost:8888/tree" + get_token())

    subprocess.run(
        [powershell, 'jupyter', 'notebook', 'stop', '8099'], stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)

    jupyter_server.kill()

    input()

    # t_server.join()

    print("bonjour !")


def run_server():
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    subprocess.run(
        [powershell, 'jupyter', 'notebook'])
    print("t1")


def get_token() -> str:
    powershell = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
    server_launch = subprocess.run(
        [powershell, "jupyter", "notebook", "list"], capture_output=True)

    module_logger.debug(f"return of powershell command {server_launch.stdout}")

    command_result = server_launch.stdout.decode("ascii")
    token_search = re.search("\?token=[\w]+", command_result)
    if token_search == None:
        raise LookupError("token not found !")
    module_logger.debug("token found !")

    return token_search.group(0)


if __name__ == "__main__":
    main()
