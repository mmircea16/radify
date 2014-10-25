echo "deploying static site..."

scp -i /var/go/ssh_key -r ./resouces/public/* root@104.131.74.12:/usr/share/nginx/
