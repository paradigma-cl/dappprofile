# How to install the App profile service

We will need:

     1. Linux Operating System (in this example we will use Ubuntu)
     2. An HTTPS:// certificate such as Let's Encrypt certificate (with Cerbot tool)
     3. An application server, we will detail our example with NGINX

The first thing is to install the free Let’s Encrypt certificates with the Certbot tool for Linux
The steps to run the appilcation is the following:

**1. We update the list of linux packages.**
     sudo apt-get update

**2. We add the certbot repository.**
     sudo add-apt-repository ppa:certbot/certbot

**3. We install the Certbot package**
     sudo apt-get install certbot

**4. We create the certificate for our domain, the NGINX server must not be running at the time of creating the certificate.**
     sudo certbot –nginx

     We will use an example domain name anydomain.app
     So, the Generated certificated will be available under /etc/letsencrypt/live/anydomain.app
     In that directory we will have two files:

      /etc/letsencrypt/live/anydomain.app/fullchain.pem
      /etc/letsencrypt/live/anydomain.app/privkey.pem

**5. Then we will install the virtual domains with NGINX**
     Installation Certificate for multiple domains, for example johnsmith.anydomain.app or mary_olsen.anydomain.app

     Instalación Certificado para profile
     sudo certbot certonly \
     --manual \
     --agree-tos \
     --preferred-challenges=dns \
     --server https://acme-v02.api.letsencrypt.org/directory \
     --email soporte.paradigma.global \
     --domains *.xck.app
     
     The Generated certificated will be available under /etc/letsencrypt/live/anydomain-0001.app

     /etc/letsencrypt/live/anydomain.app-0001/fullchain.pem
     /etc/letsencrypt/live/anydomain.app-0001/privkey.pem

**6. An important step associated with virtual domains is the following:**

     *(enter DNS usually with CPANEL)*

     And add in the DNS (usually with CPANEL) a record for *.anydomain.app

     For wildcard certificates, the only challenge method Let’s Encrypt accepts is the DNS challenge, which we can invoke via the preferred-challenges=dns flag.
     After executing the above command, the Certbot will share a text record to add to your DNS.
     Please deploy a DNS TXT record under the name
     _acme-challenge.erpnext.xyz with the following value for example:

     J50GNXkhGmKCfn-0LQJcknVGtPEAQ_U_WajcLXgqWqo

     Record Name: _acme-challenge
     Record Value: J50GNXkhGmKCfn-0LQJcknVGtPEAQ_U_WajcLXgqWqo

     Create TXT record via DNS console and setup key and value

**7. Modify site settings**
     cd /etc/nginx/sites-enabled
     sudo nano profile.conf

        ##
        # Profile server configuration
        ##

        server {
                listen 443 ssl; # managed by Certbot
                ssl_certificate /etc/letsencrypt/live/anydomain.app-0001/fullchain.pem; # managed by Certbot
                ssl_certificate_key /etc/letsencrypt/live/anydomain.app-0001/privkey.pem; # managed by Certbot
                include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
                ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

                server_name *.anydomain.app;

                root /var/www/profile/html;

                index index.html index.htm index.nginx-debian.html;

                location / {
                    add_header 'Access-Control-Allow-Origin' '*' always;
                    try_files $uri $uri/ =404;
                }
        }

        server {
            if ($host = anydomain.app) {
                return 301 https://$host$request_uri;
            } # managed by Certbot

**8. Instalar y compilar el app profile**
     To setup the development environment for this repository, follow these steps:

        1. Clone this package.
        2. Run npm install to install dependencies
        3. Run npm run build to build packages

**9. Create site in folder /var/www/profile/html**
      /var/www/profile/html
      Install in this directory the contents of the build folder that was generated when compiling the application

**10. Start NGINX**
      sudo systemctl start nginx

[Link Demo Profile](https://support.xck.app)

[Link Demo Display JSON](https://support.xck.app/.well-known/profile)

[Link Demo Profile](https://my.xck.app/support.xck.app)

[Link Demo Display JSON](https://my.xck.app/support.xck.app/.well-known/profile)
