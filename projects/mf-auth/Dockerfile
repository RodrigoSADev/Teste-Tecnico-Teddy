FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

RUN npm install

COPY . .
RUN npm run build -- --project=mf-auth

FROM nginx:alpine

COPY projects/mf-auth/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/mf-auth/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]