FROM nexus-docker-craigmiller160.ddns.net/nginx-base:1.1.3

COPY ./build/video-manager-client-*.tgz /var/www/video-manager-client.tgz
RUN tar xvf /var/www/video-manager-client.tgz -C /var/www/
RUN rm /var/www/video-manager-client.tgz
RUN cp -R /var/www/package/build/* /var/www/
RUN rm -rf /var/www/package
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]