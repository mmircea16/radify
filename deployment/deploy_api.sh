ssh -i /var/go/ssh_key root@104.131.74.12 'pkill java ; nohup java -jar /api/radify-0.1.0-SNAPSHOT-standalone.jar > /dev/null 2>/dev/null </dev/null  &'

