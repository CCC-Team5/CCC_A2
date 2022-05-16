## Cluster Cloud Computing - Assignment 2 (Team 5)

### Project Summary

This project explores into aspects of the **liveability** of great melbourne through the voice of people by using twitter data. Several scenarios are developed for chosen liveability indicators of **opportunity**, **housing**, **transportation** and **neighborhood**, with trending hashtags and cost of living as additions.



Twitter data are primarily employed as the basis, as tremendous amount of relevant discussions are expected to be discovered. Data from **Australian Urban Research Infrastructure Network(AURIN)**. 



All components of entire project are containerized by **docker**, and automatically deployed by **Ansible** on instances across **Melbourne Research Cloud(MRC)**. Components include **Twitter Harvest**, **CouchDB**, web application like **React**, **Django**.





### Contributors

| Name          | Student ID | Email                                                        |
| ------------- | ---------- | ------------------------------------------------------------ |
| Xinhao Chen   | 1230696    | [xinhchen1@student.unimelb.edu.au](mailto:xinhchen1@student.unimelb.edu.au) |
| Weimin Ouyang | 340438     | [wouyang@student.unimelb.edu.au](mailto:wouyang@student.unimelb.edu.au) |
| Tianqi Yu     | 1221167    | [tyyu2@student.unimelb.edu.au](mailto:tyyu2@student.unimelb.edu.au) |
| Junjie Xia    | 1045673    | [juxia@student.unimelb.edu.au](mailto:juxia@student.unimelb.edu.au) |
| Yuling Zheng  | 1045673    | [yulingz3@student.unimelb.edu.au](mailto:yulingz3@student.unimelb.edu.au) |



### Repository Structure

```yaml
/.idea
    - project configuration 
/data_analyses
    - data analyse section
/demo
    - data analyse previous test and experiment
/deployment
    - Ansible scripts
/report
    - project report
/tweet_harv_app
    - frontend application
/tweet_harv_backend
    - backend server
/twitter-harvester
    - source codes for twitter harvester scripts

```



### Installation and Deployment Guide

The whole system can be deployed using ansible and was designed to be operated on the MRC. Therefore,the follow prerequisites need to be satisfied in order to deploy and interact with the system:

- Having an eligible MRC account

- Having a Linux terminal

- Having Ansible installed by input command in the Linux terminal: ```python -m pip install --user ansible```



- Connecting to Unimelb using the **Cisco VPN** (if you are using an unimelb account)



Once logged into the MRC dashboard successfully, the installation and deployment can be done In the following steps:

- Download the **OpenStack RC file** from the dashboard and rename it to **grp5-openrc.sh**. A password is required to access the MRC using the **OpenStack API**. It is recommended to go to the account settings and reset the password, and then copy and save the new password somewhere as users will be asked to input the password several times during the execution of the script.
- Create a new SSH key pair in the MRC dashboard. A **.pem** file would then be automatically downloaded. Rename the file to **grp5_key.pem** and put it together with the **grp5-openrc.sh** downloaded in Step1 in the CCC_A2/deployment/serverfiles.
- Open the terminal in the CCC_A2/deployment folder. We’ve created a main script **exec-grp5-deploy.sh** for managing the whole process of deployment.
- Execute the command **sh exec-grp5-deploy.sh** in the linux terminal. It will first ask for the sudo password, then ask for the password generated in Step1.
- Input openstack password when necessary. After the whole execution flow is completed, the whole system (the twitter harvester and the web application) should be up and running.
- To interact with the system, find the IP address of the master instance in the **hosts file** under the Webserver category. Enter the IP address at the port 3000 in the web browser.

### UI Design Presentation

<!-- <img src="https://github.com/CCC-Team5/CCC_A2/blob/main/1.jpg" alt="theme" style="zoom:20%;" />
<img src="https://github.com/CCC-Team5/CCC_A2/blob/main/2.jpg" alt="chart" style="zoom:24%;" /> -->
<img src="https://github.com/CCC-Team5/CCC_A2/blob/main/1.jpg" alt="theme" width="400" /><img src="https://github.com/CCC-Team5/CCC_A2/blob/main/2.jpg" alt="chart" width="600" />

### Videos Presentation

| Theme                                           | YouTube link |
| ----------------------------------------------- | ------------ |
| Introduction of project and System Architecture |              |
| Deployment                                      |              |
| Frontend Demo                                   |              |



### Web App

[Group 5 Meow](http://172.26.134.129:3000/)





