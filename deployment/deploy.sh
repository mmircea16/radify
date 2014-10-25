echo "Hello world"

scp -i /var/go/ssh_key -r ./public/* root@104.131.74.12:/usr/share/nginx/
