#!/bin/bash

#Installing Docker
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo tee /etc/apt/sources.list.d/docker.list <<EOF
deb https://apt.dockerproject.org/repo ubuntu-xenial main
EOF
sudo apt-get update
sudo apt-get purge lxc-docker
apt-cache policy docker-engine
sudo apt-get install -y docker-engine curl python-pip

curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose -version
sudo service docker start

#Add the User group
sudo usermod -aG docker vagrant

wget -q https://packages.chef.io/stable/ubuntu/12.04/chefdk_0.18.30-1_amd64.deb > /dev/null
sudo dpkg -i chefdk_0.18.30-1_amd64.deb

mkdir -p /home/vagrant/cd-nginx/chef/site-cookbooks

cd /home/vagrant/cd-nginx
touch Berksfile

sudo cp /home/vagrant/sync/Berksfile /home/vagrant/cd-nginx/chef/Berksfile

berks install
berks vendor chef/cookbooks

sudo cp /home/vagrant/sync/zero.rb /home/vagrant/cd-nginx/chef/zero.rb
sudo cp /home/vagrant/sync/first-boot.json /home/vagrant/cd-nginx/chef/first-boot.json
sudo cp /home/vagrant/sync/Dockerfilechef /home/vagrant/cd-nginx/chef/Dockerfile
sudo cp /home/vagrant/sync/startup.sh /home/vagrant/cd-nginx/startup.sh
sudo cp /home/vagrant/sync/Dockerfile /home/vagrant/cd-nginx/Dockerfile
sudo cp /home/vagrant/sync/docker-compose.yml /home/vagrant/cd-nginx/docker-compose.yml

sudo chmod -R 777 /home/vagrant/cd-nginx/
