# RdBrainsDockerDemo
This demo consists of 5 docker images, which builds a demo shop to prove the ease of setting up an app with different technologies in seconds
* API (.Net WEB API)
* CART (Shopping cart session server NodeJs)
* WEB (Angular)
* ZUUL (Reverse proxy for connecting the API's - Java)
* REDIS (Session)

## How To Start

### Start separate

$docker network create demonw

* $docker run -d --name demoweb --net demonw scyaq02/demoweb /usr/sbin/apache2ctl -D FOREGROUND
* $docker run -d --name democart --net demonw scyaq02/democart
* $docker run -d --name demoapi --net demonw scyaq02/demoapi
* $docker run -d -p 80:8080 --name democart --net demonw scyaq02/demogateway
* $docker run -d --name redis --net demonw redis

### With docker-compose

included is a docker compose file you can start the complete app simply with

* $docker network create demonw
* $docker-compose up

In the repository you can also find the source code of the different container apps and a powershell script to build and run them. 
The .NET api must be published from within Visual Studio.
