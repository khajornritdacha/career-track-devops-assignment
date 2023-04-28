FROM mongo:5.0.16

ENV MONGO_INITDB_DATABASE=products
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=tenkaichi

COPY ./init /docker-entrypoint-initdb.d
