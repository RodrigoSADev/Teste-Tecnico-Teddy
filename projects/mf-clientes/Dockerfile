FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

RUN npm install

COPY . .
RUN npm run build -- --project=mf-clientes

FROM nginx:alpine

COPY projects/mf-clientes/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/mf-clientes/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]

# WORKDIR /app

# # Copiar arquivos de dependências
# COPY package*.json ./
# COPY tsconfig*.json ./
# COPY angular.json ./

# # Instalar dependências
# RUN npm install

# # Copiar código fonte
# COPY projects/mf-clientes ./projects/mf-clientes
# COPY projects/shared ./projects/shared

# # Expor porta
# EXPOSE 4200

# # Comando para iniciar o servidor de desenvolvimento
# CMD ["npm", "run", "start:mf-clientes", "--", "--host", "0.0.0.0", "--disable-host-check"] 