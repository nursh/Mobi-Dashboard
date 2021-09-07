FROM node:stretch 
EXPOSE 8080
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install && npm cache clean --force
CMD ["npm", "start"]