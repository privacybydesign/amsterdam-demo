# IRMA demo

## Install

- Install ngrok: https://ngrok.com/download

## Run demo

- Go to this directory (with this readme file). 
- First run ngrok:
```bash
ngrok start -config ngrok.yml irma
```
- Copy-paste the ngrok forwarding url port 8088 to `irmaserver.json`.
- Copy-paste the ngrok forwarding hostname port 8000 to `node_server/public/js/demo.js`.
- Quit IRMA when running
- Run `start.sh` to start IRMA.
- Run `node index.js` from `node_server` directory.
- Visit the ngrok-url from `irmaserver.json` with your browser.
