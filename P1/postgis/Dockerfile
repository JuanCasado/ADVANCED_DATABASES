FROM kartoza/postgis:12.0

ENV POSTGRES_DB=airplanes
ENV POSTGRES_USER=advanced
ENV POSTGRES_PASS=password

RUN mkdir /var/lib/postgresql/data/airplanes -p
ENV PGDATA=/var/lib/postgresql/data/airplanes

COPY ./modeloBD/* /docker-entrypoint-initdb.d/

EXPOSE 5432

RUN echo "DB: ${POSTGRES_DB} USER: ${POSTGRES_USER} PASSWORD: ${POSTGRES_PASS}"
