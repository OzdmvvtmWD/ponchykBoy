FROM node:18-slim

WORKDIR /frontend/my-app

COPY ./my-app/package*.json .

RUN npm install

COPY ./my-app .

EXPOSE 5173

CMD ["npm", "run", "dev-exposed"]