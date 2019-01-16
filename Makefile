all: buildd publish

buildd:
	yarn build

publish:
	docker build -t influxdb-ui:latest .

