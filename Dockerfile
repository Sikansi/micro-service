# node 18 necessario para funcionamento do projeto
FROM node:18

# diretorio onde será construido o container
WORKDIR /app

# copia package.json e package-lock.json para setar os modulos ja disponiveis
COPY package*.json ./

# isntala todos os modulos e suas dependencias (só roda denovo se tiver alteração no package.json)
RUN npm install

# copia todos os outros arquivos e pastas, menos os declarados no .dockerignore
COPY . .

# da build no projeto
RUN npm run build

# expõe uma porta virtual para acessar o projeto
EXPOSE 8081

# escolhe o executavel e o que ele vai executar
CMD [ "npm", "start" ]