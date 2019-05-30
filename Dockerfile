FROM node:latest as build
WORKDIR /app
COPY . /app
RUN yarn install && yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
