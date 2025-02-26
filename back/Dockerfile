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
# yarn start will run the dev script, building the database if it hasn't been built.
# It then runs via nodemon for live-reload. This happens on container startup.
ENTRYPOINT ["yarn", "start"]

FROM base AS production
WORKDIR /app
ENV NODE_ENV="production"
EXPOSE 80
COPY ./src /app
COPY ./bin /app
# yarn build-production builds a new database, even if one already exists. It then runs
# via node, without live-reload. This happens during image build, before container startup.
RUN ["yarn", "build-production"]
ENTRYPOINT ["node" "./src/index.js"]