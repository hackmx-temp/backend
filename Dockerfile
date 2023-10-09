FROM node:18

WORKDIR /myapp
COPY package.json .
RUN npm install

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

EXPOSE 3000

COPY . .
CMD npm start

