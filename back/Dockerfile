FROM node:23 AS base
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN npm install yarn
RUN yarn

FROM base AS development
WORKDIR /app
ENV NODE_ENV="development"
EXPOSE 3000
# In case we don't sync src, this copy command still lets the docker image run.
# It just won't have live reloading.
# We also need to copy bin, as yarn start makes use of the shell scripts.
COPY ./src /app
COPY ./bin /app
ENTRYPOINT ["yarn", "start"]

FROM base AS production
WORKDIR /app
ENV NODE_ENV="production"
EXPOSE 80
RUN ["yarn", "build-production"]
COPY ./**/*.js /app
COPY ./**/*.db /app
ENTRYPOINT ["node" "./src/index.js"]