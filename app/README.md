# Installation Guide and use of the application

## AMBIENTE DESARROLLO

1. CREAR BUILD
   cd  /home/jfontirroig/pact/dappcrosscheck
   sudo npm install
   sudo npm run build
   sudo chmod 777 -R /home/jfontirroig/pact/dappcrosscheck/build
   copiar /home/jfontirroig/pact/dappcrosscheck/build/*.* a directorio /srv/crosscheck/build  en servidor de producción

## AMBIENTE PRODUCCION

- SERVER LINUX CON DOMINIO CROSSCKECK.PARADIGMA.GLOBAL / XCK.APP
  IP: 190.113.12.16
  User: paradigma
  Password: xaeKoo3f

- DEPRECADO APACHE2 ------------------------------------------------------------------------------------------
  ver directorio /etc/apache2/sites-available/

- NGINX ------------------------------------------------------------------------------------------
  ver directorio /etc/nginx/sites-available/


- LET'S ENCRYPT ------------------------------------------------------------------------------------
  ver link https://www.rosehosting.com/blog/how-to-install-lets-encrypt-on-ubuntu-20-04-with-apache/
  ver link https://noviello.it/es/como-instalar-lets-encrypt-para-apache-en-ubuntu-20-04-lts/
  ver link https://www.jesusamieiro.com/generar-un-certificado-ssl-wildcard-con-lets-encrypt/
  ver link https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-es
  ver link https://www.digitalocean.com/community/questions/sudo-ufw-status-return-inactive


  sudo apt-get install software-properties-common.
  sudo add-apt-repository universe.
  sudo apt-get install certbot python3-certbot-apache.
  sudo ufw status.
  sudo ufw allow 'Apache Full'
  sudo certbot --apache.
  sudo certbot --apache certonly.
  sudo certbot renew --dry-run.


- Renovación
  sudo systemctl stop nginx
  sudo certbot renew --force-renew


SSLCertificateFile /etc/letsencrypt/live/xck.app/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/xck.app/privkey.pem

- DEPLOY ------------------------------------------------------------------------------------------
  sudo service apache2 stop
  cd /srv/crosscheck/build
  sudo rm -rf /var/www/html
  cd /var/www/html
  cd ..
  sudo mkdir html
  cd html
  cd /srv/crosscheck/build
  sudo cp -r * /var/www/html
  cd /var/www/html
  sudo nano .htaccess

     Header set Access-Control-Allow-Origin "https://xck.app"
     Header set Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"
     Header set Access-Control-Allow-Headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,C$
     Header set Access-Control-Allow-Credentials true

     Options -MultiViews
     RewriteEngine On
     RewriteCond %{SERVER_PORT} 80
     RewriteRule ^(.*)$ https://xck.app/$1 [R=301,L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteRule ^ index.html [QSA,L]

  DEPRECADO ---> sudo service apache2 restart
  sudo systemctl start nginx

  ---------------------------------------

  Verify the deployment by navigating to your server address in your preferred browser.
  ---------------------------------------
  https://xck.app
  https://crosscheck.paradigma.global
  ---------------------------------------

- TEST IOT DEVICE
  cd /etc/letsencrypt/live/xck.app/
  sudo json-server2 --watch /srv/crosscheck/datasensor.json --port 8443 --host xck.app --C fullchain.pem -K privkey.pem





-  Multiples dominios para crosscheck y profile

  Instalación Certificado para profile
  sudo certbot certonly \
  --manual \
  --agree-tos \
  --preferred-challenges=dns \
  --server https://acme-v02.api.letsencrypt.org/directory \
  --email soporte.paradigma.global \
  --domains *.xck.app

  Generated certificated will be available under /etc/letsencrypt/live/xck.app

  /etc/letsencrypt/live/xck.app/fullchain.pem
  /etc/letsencrypt/live/xck.app/privkey.pem

  -----------------------------------------------------------------------------

  Certificado para crosscheck
  sudo certbot --nginx

  Generated certificated will be available under /etc/letsencrypt/live/xck.app-001
  /etc/letsencrypt/live/xck.app-0001/fullchain.pem
  /etc/letsencrypt/live/xck.app-0001/privkey.pem

  -----------------------------------------------------------------------------
  Sitios
  /var/www/crosscheck/html
  /var/www/profile/html

  -----------------------------------------------------------------------------

  Archivo configuración crosscheck
  /etc/nginx/sites-enabled
  sudo nano crosscheck.conf

  ##
  # Crosscheck server configuration
  ##

  server {

          listen [::]:443 ssl ipv6only=on; # managed by Certbot
          listen 443 ssl; # managed by Certbot

          ssl_certificate /etc/letsencrypt/live/xck.app-0001/fullchain.pem; # managed by Certbot
          ssl_certificate_key /etc/letsencrypt/live/xck.app-0001/privkey.pem; # managed by Certbot
          include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
          ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

          if ($host = www.xck.app) {
              return 301 https://xck.app$request_uri;
          } # managed by Certbot

          server_name xck.app;

        	root /var/www/crosscheck/html;

        	index index.html index.htm index.nginx-debian.html;

        	location / {
        	    try_files $uri $uri/ =404;
              add_header 'Access-Control-Allow-Origin' '*' always;
          }
  }

  server {

          listen 443 ssl; # managed by Certbot
          ssl_certificate /etc/letsencrypt/live/xck.app/fullchain.pem; # managed by Certbot
          ssl_certificate_key /etc/letsencrypt/live/xck.app/privkey.pem; # managed by Certbot
          include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
          ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

          server_name *.xck.app;

          root /var/www/profile/html;

          index index.html index.htm index.nginx-debian.html;

          location / {
              try_files $uri $uri/ =404;
              add_header 'Access-Control-Allow-Origin' '*' always;
          }
  }

  server {

  	listen 80 default_server;
  	listen [::]:80 default_server;

          if ($host = www.xck.app) {
              return 301 https://xck.app$request_uri;
          } # managed by Certbot

          server_name xck.app;

          root /var/www/profile/html;

          index index.html index.htm index.nginx-debian.html;

          location / {
              try_files $uri /index.html?$args;
          }

          location ~ \.htm$ {
              try_files $uri =404;
          }
  }

  server {

          listen 80;
          listen [::]:80;

          server_name *.xck.app;

          root /var/www/profile/html;

          index index.html index.htm index.nginx-debian.html;

          location / {
              try_files $uri $uri/ =404;
              add_header 'Access-Control-Allow-Origin' '*' always;
          }
  }


  ----------------------------------------------------------------------------------
  DNS
  For wildcard certificates, the only challenge method Let’s Encrypt accepts is the DNS challenge, which we can invoke via the preferred-challenges=dns flag.
  After executing the above command, the Certbot will share a text record to add to your DNS.
  Please deploy a DNS TXT record under the name
  _acme-challenge.erpnext.xyz with the following value for example:
  J50GNXkhGmKCfn-0LQJcknVGtPEAQ_U_WajcLXgqWqo
  Record Name: _acme-challenge
  Record Value: J50GNXkhGmKCfn-0LQJcknVGtPEAQ_U_WajcLXgqWqo
  Create TXT record via DNS console and setup key and value

  Y agregar en el DNS un registro para *.xck.app

- Renovación
  sudo systemctl stop nginx
  sudo certbot renew --force-renew

- Verificar Servidores
curl -I https://xck.app
curl -I https://support.xck.app


License
MIT
