# Set to the name of the Docker machine you want to use
$DOCKER_MACHINE_NAME='default'

# Set to the name of the Docker image you want to use
$DOCKER_IMAGE_NAME='my-site'

# Stop on first error
$ErrorActionPreference = "Stop"

# Create a Docker host
if( !(@(docker-machine ls) -like "$DOCKER_MACHINE_NAME *" ) ) {
  docker-machine create --driver virtualbox $DOCKER_MACHINE_NAME
}

# Start the host
if( @(docker-machine ls) -like "$DOCKER_MACHINE_NAME * Stopped *" ) {
  docker-machine start $DOCKER_MACHINE_NAME
}

# Load our docker host's environment variables
docker-machine env $DOCKER_MACHINE_NAME --shell powershell | Invoke-Expression

if( Test-Path Dockerfile ) {
  # Build a custom Docker image that has custom Jekyll plug-ins installed
  docker build --tag $DOCKER_IMAGE_NAME --file Dockerfile .

  # Remove dangling images from previous runs
  @(docker images --filter "dangling=true" -q) | % {docker rmi -f $_}
}
else {
  # Use an existing Jekyll Docker image
  $DOCKER_IMAGE_NAME='grahamc/jekyll'
}

echo "***********************************************************"
echo "  Your site will be available at http://$(docker-machine ip $DOCKER_MACHINE_NAME):4000"
echo "***********************************************************"

# Translate your current directory into the file share mounted in the Docker host
$host_vol = $pwd.Path.Replace("C:\", "/c/").Replace("\", "/")
echo "Mounting $($pwd.Path) ($host_vol) to /src on the Docker container"

# Start Jekyll and watch for changes
docker run --rm `
  --volume=${host_vol}:/src `
  --publish 4000:4000 `
  $DOCKER_IMAGE_NAME `
  serve --watch --drafts --force_polling -H 0.0.0