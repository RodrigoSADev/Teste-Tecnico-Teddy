FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

RUN npm install

COPY projects/shell ./projects/shell

RUN npm run build -- --project=shell

# Production stage
FROM nginx:alpine

# Alterando o caminho para copiar o conteúdo correto
COPY --from=build /app/dist/shell/browser /usr/share/nginx/html
COPY projects/shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# # COPY projects/shell ./projects/shell
# # COPY projects/shared ./projects/shared

# COPY . .

# RUN npm run build

# # Estágio de produção
# FROM nginx:alpine

# # Copiar configuração do nginx
# COPY projects/shell/nginx.conf /etc/nginx/conf.d/default.conf

# # Copiar build para o nginx
# COPY --from=build /app/dist/projects/shell/browser /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"] 