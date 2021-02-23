# free5gmano-webui
## Dependencies
The following packages are required:

* git
* python3
* pip3

## Installation Guide
```
git clone https://github.com/yanyan8566/free5gmano-webui.git
cd free5gmano-webui/free5gmano_webui
vim settings.py
(Change the "NM_URL" to your free5gmano server IP and port)
cd ..
python3 manage.py migrate
python3 manage.py runserver 0:80
```
