#!/bin/bash

export ANSIBLE_HOST_KEY_CHECKING=False
. ./grp5-openrc.sh; ansible-playbook --ask-become-pass deploy_base_infra.yaml