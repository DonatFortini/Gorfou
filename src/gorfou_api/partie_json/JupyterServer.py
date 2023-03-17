from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import subprocess
import re
import time
import logging
module_logger = logging.getLogger(__name__)


class JupyterServer:
    POWERSHELL = r'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'

    def __init__(self, port=8099, shell=POWERSHELL) -> None:
        self.port = port
        self.shell = shell
        self.process = None

    def stop_server(self):
        subprocess.run(
            [self.shell, 'jupyter', 'notebook', 'stop', str(self.port)])

        self.process.kill()

        print("serveur bien fermé !")

    def run_server(self):
        self.process = subprocess.Popen(
            [self.shell, 'jupyter', 'notebook', '--no-browser', '--port=8099'], stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)
        time.sleep(3)

    def open_browser(self):
        driver = webdriver.Chrome(service=Service(
            ChromeDriverManager().install()))

        print("http://localhost:8099/tree/" + self.get_token())
        driver.get(
            "http://localhost:8099/tree/src/gorfou_api/notebooks/test_notebook.ipynb" + self.get_token())
        time.sleep(10)

    def get_token(self) -> str:
        server_launch = subprocess.run(
            [self.shell, "jupyter", "notebook", "list"], capture_output=True)

        module_logger.info(
            f"return of powershell command {server_launch.stdout}")

        command_result = server_launch.stdout.decode("ascii")
        token_search = re.search("\?token=[\w]+", command_result)
        if token_search == None:
            raise LookupError("token not found !")
        module_logger.info("token found !")

        return str(token_search.group(0))

    def __str__(self) -> str:
        pass


monServer = JupyterServer()
monServer.run_server()
monServer.open_browser()
monServer.stop_server()
