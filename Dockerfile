FROM kkarczmarczyk/node-yarn:8.0-slim
WORKDIR /app
COPY . /app/
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn global add fis3
RUN yarn
RUN npm run online
MAINTAINER youremail@domain.com
