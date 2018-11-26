all: build publish

build:
	yarn build

publish:
	docker build -t influxdb-ui:latest .

