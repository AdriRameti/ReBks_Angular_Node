FROM mongo:latest
RUN mkdir dump
COPY /dump /dump
EXPOSE 27017