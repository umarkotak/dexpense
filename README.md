# DEXPENSE

## TODO

## RUN on wsl and expose port

on wsl terminal
sudo ufw allow 3000

on windows power shell
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.25.56.237
