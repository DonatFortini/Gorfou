import re

token = re.search("\?token=[\d]+", "token=?11654646")
if token == None:
    raise LookupError("token not found !")
print("found")
