import sys
import requests
import time

headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}


# the name of the corresponding user will be also be sys.argv[1]

# url = 'https://iic.devclub.in/sudo/deleteAll'

url = 'http://localhost:7500/sudo/deleteAll'

r = requests.get(url, verify=False)
print('done')
time.sleep(0.1)
