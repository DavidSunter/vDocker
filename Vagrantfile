Vagrant.configure("2") do |config|

  config.vm.define "docker" do |docker|
    docker.vm.box = "bento/ubuntu-16.04"
    docker.vm.network "forwarded_port", guest: 80, host: 80
    docker.vm.network "forwarded_port", guest: 80, host: 443
    docker.vm.network "forwarded_port", guest: 80, host: 1080
    docker.vm.network "forwarded_port", guest: 80, host: 1180
    docker.vm.network "forwarded_port", guest: 80, host: 1443
    docker.vm.network "forwarded_port", guest: 80, host: 8080
    docker.vm.synced_folder "~/dockersite", "/home/vagrant/dockersite"
    docker.vm.synced_folder "cookbooks", "/home/vagrant/cd-nginx/chef/site-cookbooks"
    docker.vm.synced_folder "sync", "/home/vagrant/sync"
    docker.vm.synced_folder "Project", "/home/vagrant/Project"

    docker.vm.provision "shell", path: "shell/docker.sh"
  end
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.name = "Docker"
  end
end
