#!/bin/bash

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
