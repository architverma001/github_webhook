// createWebhook.js
import { Octokit } from '@octokit/rest';

// Initialize Octokit with your personal access token
const octokit = new Octokit({ auth: 'your-token' });

// Function to list existing webhooks
async function listWebhooks(owner, repo) {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/hooks`, {
        owner,
        repo
    });
    return response.data;
}

// Function to create a webhook
async function createWebhook(owner, repo) {
    const webhookConfig = {
        url: 'https://42e4-43-241-193-176.ngrok-free.app/webhook', // Replace with your ngrok URL
        content_type: 'json'
    };

    const events = ['push', 'pull_request', 'deployment','deployment_status','status']; // Specify the events you want to subscribe to

    try {
        // List existing webhooks
        const webhooks = await listWebhooks(owner, repo);
        console.log('Repo details:', { owner, repo });

        // Create a new webhook if it doesn't already exist
        if (webhooks.length === 0) {
            const response = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
                owner,
                repo,
                config: webhookConfig,
                events,
                active: true,
            });
            console.log('Webhook created:', response.data);
        } else {
            console.log('Webhook already exists:', webhooks);
        }
    } catch (error) {
        console.error('Failed to create webhook:', error);
    }
}

// Replace with your GitHub repository details
const owner = 'architverma001'; // e.g., 'architverma001'
const repo = 'college_event_frontend'; // e.g., 'aicodes'

createWebhook(owner, repo);
