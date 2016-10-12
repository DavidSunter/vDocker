#
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# sudo apt-get update -y
# sudo apt-get install -y mongodb-org
# sudo cp ~/servers/database/mongodb.service /etc/systemd/system/mongodb.service
# sudo cp ~/servers/database/mongod.conf /etc/mongod.conf
# sudo systemctl daemon-reload
# sudo systemctl start mongod
# sudo systemctl enable mongod
# sudo iptables -A INPUT -s 192.10.10.100,192.10.10.150 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT

# sudo apt-get install curl
#
# curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chefdk -c stable -v 0.16.28
#
#
# sudo chef-client --local-mode --runlist "recipe[db]"
