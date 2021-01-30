FROM craigmiller160.ddns.net:30004/nginx-base:1.1.0

RUN apt-get update && apt-get install unzip

COPY ./build/video-manager-client-*.zip /var/www/video-manager-client.zip
RUN unzip /var/www/video-manager-client.zip -d /var/www/
RUN rm /var/www/video-manager-client.zip
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]