FROM node:14.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock","./"]
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 8000
CMD ["yarn", "start"]
