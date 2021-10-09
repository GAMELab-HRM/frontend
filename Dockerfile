FROM node as builder

COPY ./package*json ./

RUN npm install 

COPY ./ ./ 

RUN npm run build 

FROM alpine 

COPY --from=builder ./dist /dist 

