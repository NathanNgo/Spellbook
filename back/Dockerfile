FROM node:23
WORKDIR /app
COPY package.json /app
RUN npm install yarn
RUN yarn
COPY . /app
CMD ["yarn", "start"]
