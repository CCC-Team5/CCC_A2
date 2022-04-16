#!/bin/bash

export ANSIBLE_HOST_KEY_CHECKING=False
. ./grp5-openrc.sh; ansible-playbook -i hosts_couch -u ubuntu --private-key=grp5_key.pem --ask-become-pass deploy-couch-cluster.yaml