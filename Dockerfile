FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 8085
CMD [ "node", "index.js" ]