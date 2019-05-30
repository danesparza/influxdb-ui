BUILDVERSION=$(shell git describe --tags --always)

all: docker

docker:
	docker build -t influxdb-ui:$(BUILDVERSION) .

publish: docker
	docker tag influxdb-ui:$(BUILDVERSION) sillydong/influxdb-ui:$(BUILDVERSION)
	docker tag influxdb-ui:$(BUILDVERSION) sillydong/influxdb-ui:latest
	docker push sillydong/influxdb-ui:$(BUILDVERSION)
	docker push sillydong/influxdb-ui:latest
