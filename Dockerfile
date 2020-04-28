# build stage
FROM node:lts-alpine as build-stage

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]