import json
import sys
import requests
import time

file = sys.argv[1]
data = None
with open(file, 'r') as f:
	data = f.read()
json_data = json.loads(data)
# readUrl = 'https://iic.devclub.in/api/getAdmin'
readUrl = 'http://localhost:7500/api/getAdmin'

admin = ''
while admin == '':
    try:
        admin = requests.get(readUrl, verify=False)
        break
    except:
        print("Connection refused by the server..")
        print("Let me sleep for 5 seconds")
        print("ZZzzzz...")
        time.sleep(5)
        print("Was a nice sleep, now let me continue...")
        continue

# sys.arv[2] = ['events, blog, resources, showcase, team']
if admin.json()['status'] == True :
	url = 'http://localhost:7500/api/insertData/' + sys.argv[2] + '/'
	# url = 'https://iic.devclub.in/api/insertData/' + sys.argv[2] + '/'

	headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
	for payload in json_data:

		# NOTE:- comment following line when inserting team data
		payload['addedBy']['uid'] = admin.json()['data']['_id']

		r = requests.post(url, data=json.dumps(payload), headers=headers)
		print('done');
		time.sleep(0.1)
		# break
else:
	print("Whoops, an error occured pls try again")
