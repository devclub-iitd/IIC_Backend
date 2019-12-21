import sys
import requests
import time

headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}


# username = sys.argv[1]
# password = helloworld
# the name of the corresponding user will be also be sys.argv[1]

url = 'http://localhost:7500/createSAdmin/' + sys.argv[1] + '/'


r = requests.get(url, verify=False)
print('done')
time.sleep(0.1)
