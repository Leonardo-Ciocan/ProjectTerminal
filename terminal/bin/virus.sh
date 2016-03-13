
docker-machine start default
eval $(docker-machine env default)
docker-machine ssh default docker run python bash -c ls /