# influxdb-ui [![CircleCI](https://circleci.com/gh/danesparza/influxdb-ui.svg?style=shield)](https://circleci.com/gh/danesparza/influxdb-ui)
A simple UI for InfluxDB.  Now that [web admin UI has been removed](https://docs.influxdata.com/influxdb/v1.3/administration/differences/#web-admin-ui-removal) in version 1.3 and later releases, I thought it might still be nice to have a simple web UI to manage InfluxDB.

Built entirely in [React](https://reactjs.org/)/Flux as a browser based single page application.  

## Installing

Just grab the [latest release](https://github.com/danesparza/influxdb-ui/releases/latest) and unzip in the webserver of your choice (or just upload to an S3 bucket and turn on [static website hosting](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)).

## Building
```
yarn
yarn build
```
