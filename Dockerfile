FROM node:14-alpine

# Create app directory
WORKDIR /app

#Copy package.json and package-lock to enjoy caching
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["./start.sh"]
