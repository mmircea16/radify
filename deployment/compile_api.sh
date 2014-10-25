sudo apt-get install leiningen

lein uberjar 

scp -i /var/go/ssh_key -r ./target/radify-0.1.0-SNAPSHOT-standalone.jar  root@104.131.74.12:/api/



