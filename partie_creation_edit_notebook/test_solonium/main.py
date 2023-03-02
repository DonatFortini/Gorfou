"""ouverture d'un notebook jupyter à l'aide de selenium"""


import os
import subprocess
from selenium import webdriver

driver = webdriver.Firefox(
    executable_path=r'C:\\Program Files (x86)\\geckodriver.exe')


url = "https://www.geeksforgeeks.org/"

driver.get(url)
