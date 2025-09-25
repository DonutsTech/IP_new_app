FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Copiar package.json 
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]