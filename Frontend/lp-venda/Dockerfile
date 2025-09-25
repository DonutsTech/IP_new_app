FROM node:18-alpine AS base

# Instalar dependências do sistema  
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]