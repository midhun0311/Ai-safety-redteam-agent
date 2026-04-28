import urllib.request
import json
req = urllib.request.Request(
    'http://127.0.0.1:8000/test',
    data=json.dumps({'text': 'hello'}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
req.method = 'POST'
with urllib.request.urlopen(req, timeout=5) as res:
    print(res.status)
    print(res.read().decode())
