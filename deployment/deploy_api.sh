scp -i /var/go/ssh_key -r ./app.rb root@104.131.74.12:/radify/
scp -i /var/go/ssh_key -r ./Gemfile root@104.131.74.12:/radify/
scp -i /var/go/ssh_key -r ./config.ru root@104.131.74.12:/radify/

ssh -i /var/go/ssh_key root@104.131.74.12 'pkill unicorn ; nohup CONSUMER_KEY=$CONSUMER_KEY CONSUMER_SECRET=$CONSUMER_SECRET  unicorn /radify/config.ru > /dev/null 2> /dev/null </dev/null &  '

