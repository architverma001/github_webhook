# Webhook Project with Octokit

## Overview
This project demonstrates how to create and manage GitHub webhooks using the Octokit library. It allows you to listen for specific events on a GitHub repository and process them in real time.

## Prerequisites
- Node.js installed on your machine
- An active GitHub account
- Access to the command line or terminal

## Setup Instructions

### 1. Generate a Personal Access Token
1. Go to your GitHub profile.
2. Navigate to **Developer settings**.
3. Click on **Personal access tokens**.
4. Select **Fine-grained tokens**.
5. Set the necessary permissions. Make sure to grant permissions within **Repository permissions**.
6. 
![image](https://github.com/user-attachments/assets/b82138ac-0a61-48f2-a85f-d39a89f776a1)
Dont forget to give permissions inside Repository permissions
7. Generate your token and keep it safe.

### 2. Configure Environment Variables
Create a `.env` file in the root of your project and add your GitHub token:


### 3. Install Dependencies
Run the following command to install the required dependencies:
npm install

### 4. Run api made using oktakit.js
paste your token in .env and run
nmp start



### 4. Run webhook and get triggers
first run ngrok http 3000
add token to .env
run node createWebhook.js 
at last run node index.js
you will get triggers (only those you defined in createWebhooks.js and has permission in token generation)

