BUILDVERSION=$(shell git describe --tags --always)

all: buildd docker

buildd:
	yarn build

docker: buildd
	docker build -t influxdb-ui:$(BUILDVERSION) .

publish: buildd docker
	docker tag influxdb-ui:$(BUILDVERSION) sillydong/influxdb-ui:$(BUILDVERSION)
	docker tag influxdb-ui:$(BUILDVERSION) sillydong/influxdb-ui:latest
	docker push sillydong/influxdb-ui:$(BUILDVERSION)
	docker push sillydong/influxdb-ui:latest
