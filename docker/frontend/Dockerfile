FROM node:20-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start"]
