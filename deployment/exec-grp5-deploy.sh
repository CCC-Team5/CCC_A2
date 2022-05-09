echo "#### Copying server files to all Ansible packages ####"
cp -rf serverfiles/grp5-openrc.sh grp5-base_infrastructure
cp -rf serverfiles/* grp5-dependencies
cp -rf serverfiles/* grp5-couchdb-nodes-cluster
cp -rf serverfiles/* grp5-deploy_app

echo "#### Changing permissions of private key #####"
sudo chmod 600 grp5-dependencies/grp5_key.pem
sudo chmod 600 grp5-couchdb-nodes-cluster/grp5_key.pem
sudo chmod 600 grp5-deploy_app/grp5_key.pem

echo "##### EXEC ANSIBLE build base infrastructure #####"
cd grp5-base_infrastructure
sh run-base-deploy.sh

echo "##### Moving hosts from Infra to Dependencies#####"
cd ..
cp -rf grp5-base_infrastructure/hosts grp5-dependencies
cp -rf grp5-base_infrastructure/hosts grp5-deploy_app

echo "##### EXEC ANSIBLE DEPENDENCIES #####"
cd grp5-dependencies
sh run-dependencies.sh

echo "##### Moving files from Infra to couch nodes cluster deployment #####"
cd ..
cp -rf grp5-base_infrastructure/inventory/hosts_couch grp5-couchdb-nodes-cluster
cp -rf grp5-base_infrastructure/inventory/g5-couch-dynamic-vars.yaml grp5-couchdb-nodes-cluster/host_vars
rm -r grp5-base_infrastructure/inventory/g5-couch-dynamic-vars.yaml

echo "#### DEPLOY COUCH MULTI-NODE CLUSTER ####"
cd grp5-couchdb-nodes-cluster
sh run-couch-cluster.sh

echo "#### DEPLOY & RUN APPLICATION ####"
cd ..
cd grp5-deploy_app
sh run-deploy-application.sh