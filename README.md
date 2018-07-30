# influxdb-ui [![CircleCI](https://circleci.com/gh/danesparza/influxdb-ui.svg?style=shield)](https://circleci.com/gh/danesparza/influxdb-ui)
A simple UI for InfluxDB.  Now that [web admin UI has been removed](https://docs.influxdata.com/influxdb/v1.3/administration/differences/#web-admin-ui-removal) in version 1.3 and later releases, I thought it might still be nice to have a simple web UI to manage InfluxDB.

Built entirely in [React](https://reactjs.org/)/[Flux](https://facebook.github.io/flux/docs/in-depth-overview.html#content) as a browser based single page application.  

## Just show me already

![Screenshot of influxui](influxui-screenshot.png?raw=true)

## Just let me use it already

The latest version of the app is [hosted on S3](http://influxui.s3-website-us-east-1.amazonaws.com/#/).  Don't worry.  We don't store any of your data on a remote server (and you can look at the source to verify).  Your server connections are stored in your browser as cookies/localstorage data.  

Need SSL/TLS connections to your data?  Install it locally on a secure origin.

## Installing locally

Just grab the [latest release](https://github.com/danesparza/influxdb-ui/releases/latest) and unzip to the webserver of your choice (or just upload to an S3 bucket and turn on [static website hosting](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)).

## Building locally
```
yarn
yarn build
```
