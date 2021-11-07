FROM node:14-alpine

# Create app directory
WORKDIR /app

RUN npm install nodemon -g

#Copy package.json and package-lock to enjoy caching
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "src/server", ]
