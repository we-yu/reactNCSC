FROM node:8.16.0-alpine
WORKDIR /usr/src/app

COPY InstallReacts.sh /InstallReacts.sh
RUN chmod 744 /InstallReacts.sh
CMD ["/InstallReacts.sh"]
