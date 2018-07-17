FROM onface/node-yarn-fis3:8
WORKDIR /app
COPY . /app/
RUN yarn \
    && npm run online
MAINTAINER youremail@domain.com
