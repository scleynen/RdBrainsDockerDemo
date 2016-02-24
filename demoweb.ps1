# Set to the name of the Docker machine you want to use
$DOCKER_MACHINE_NAME='default'

# Set to the name of the Docker image
$DOCKER_IMAGE_NAME='scyaq02/demoweb'

# Set to the name of the Docker container
$DOCKER_CONTAINER_NAME='demoweb'

# Set to the name of the Docker network
$DOCKER_NETWORK_NAME='demonw'

# Load our docker host's environment variables
docker-machine env $DOCKER_MACHINE_NAME --shell powershell | Invoke-Expression

cd C:\projects\Docker\RdBrainsDockerDemo\src\RDBrainsDemo.Web

if( (@(docker ps) -like "* $DOCKER_CONTAINER_NAME" ) ) {
docker stop $DOCKER_CONTAINER_NAME
}

if( (@(docker ps -a) -like "* $DOCKER_CONTAINER_NAME" ) ) {
docker rm $DOCKER_CONTAINER_NAME
}

docker build -t $DOCKER_IMAGE_NAME .

docker run -d --name $DOCKER_CONTAINER_NAME --net $DOCKER_NETWORK_NAME $DOCKER_IMAGE_NAME /usr/sbin/apache2ctl -D FOREGROUND
