echo "#### Copying server files to all Ansible packages ####"
cp -rf serverfiles/grp5-openrc.sh grp5-base_infrastructure
cp -rf serverfiles/* grp5-dependencies
cp -rf serverfiles/* grp5-couchdb-nodes-cluster
cp -rf serverfiles/* grp5-deploy_app

echo "#### Changing permissions of private key #####"
sudo chmod 600 grp5-dependencies/grp5_key.pem
sudo chmod 600 grp5-couchdb-nodes-cluster/grp5_key.pem
sudo chmod 600 grp5-deploy_app/grp5_key.pem

echo "#### Execute first Ansible module to build base infrastructure ####"
cd grp5-base_infrastructure
sh run-base-deploy.sh

echo "#### Moving hosts from First module to the Second ####"
cd ..
cp -rf grp5-base_infrastructure/hosts grp5-dependencies
cp -rf grp5-base_infrastructure/hosts grp5-deploy_app

echo "#### Execute second Ansible module to install dependencies ####"
cd grp5-dependencies
sh run-dependencies.sh

echo "#### Moving files from First module to the Third ####"
cd ..
cp -rf grp5-base_infrastructure/inventory/hosts_couch grp5-couchdb-nodes-cluster
cp -rf grp5-base_infrastructure/inventory/g5-couch-dynamic-vars.yaml grp5-couchdb-nodes-cluster/host_vars
rm -r grp5-base_infrastructure/inventory/g5-couch-dynamic-vars.yaml

echo "#### Execute third Ansible module to add nodes into CouchDB Cluster ####"
cd grp5-couchdb-nodes-cluster
sh run-couch-cluster.sh

echo "#### Execute last Ansible module to deploy and run Twitter harvester & Web application ####"
cd ..
cd grp5-deploy_app
sh run-deploy-application.sh