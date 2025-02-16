FROM node:23 AS base
WORKDIR /app
COPY package.json /app
RUN npm install yarn
RUN yarn

FROM base AS development
WORKDIR /app
ENV NODE_ENV="development"
EXPOSE 3000
# In case we don't mount the volume, this copy command still lets the docker image run.
# It just won't have live reloading.
COPY . .
CMD ["yarn", "start"]


FROM base AS production
WORKDIR /app
ENV NODE_ENV="production"
EXPOSE 80
COPY . .
CMD ["yarn", "start"]
