"""ouverture d'un notebook jupyter à l'aide de selenium"""


from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import subprocess


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://google.com")

input()
