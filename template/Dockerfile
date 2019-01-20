FROM onface/node-yarn-fis3:8-slim
WORKDIR /app
COPY . /app/
RUN yarn \
    && npm run release
MAINTAINER youremail@domain.com
