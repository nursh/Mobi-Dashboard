FROM node:stretch 
EXPOSE 3000
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install && npm cache clean --force
CMD ["npm", "start"]