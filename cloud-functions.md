(Study project in progress)

# Cloud Functions
The Cloud function code is send to a secure environment on Amazon Web Services where it is run.

It sets up an url, and all requests to that url get access to that function.

Thus the code is not executed by the client (browser), nor the static file server. AWZ will determine how many resources are needed to execute the code in their cloud.

## Netlify
Create a new folder in the root: cloud-functions

In Netlify settings -> functions -> functions directory