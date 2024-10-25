import { Octokit, App } from "octokit";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

// Initialize Octokit with authentication token from environment variable
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Middleware to parse request body as JSON
app.use(express.json());

// Route to fetch repositories of the specified user
app.get('/repos', async (req, res) => {
  try {
    // Fetch repositories for the user "architverma001"
    const { data } = await octokit.rest.repos.listForUser({
      username: "architverma001",
    });

    // Return the repository data in the response
    res.status(200).json({
      message: 'Repositories fetched successfully',
      repos: data,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({
      message: 'Error fetching repositories',
      error: error.message,
    });
  }
});

// Route to create an issue in a repository
app.post('/repos/postissues', async (req, res) => {
    try {
    
      const response = await octokit.rest.issues.create({
        owner: req.body.owner,  
        repo: req.body.repo,    
        title: req.body.title,  
        body: req.body.body,    
      });
  
      // Send success response
      res.status(201).json({
        message: 'Issue created successfully',
        issue: response.data, 
      });
    } catch (error) {
      // Send error response
      res.status(500).json({
        message: 'Failed to create issue',
        error: error.message,
      });
    }
  });

  // Route to get issues and pull requests of a repository
  app.get('/repos/getissues', async (req, res) => {
  try {
    // Fetch issues and pull requests from the repo
    const response = await octokit.rest.search.issuesAndPullRequests({
      q: `repo:${req.query.owner}/${req.query.repo} is:issue`,
      sort: 'created',
      order: 'desc'
    });

    res.status(200).json({
      message: 'Issues and Pull Requests fetched successfully',
      issuesAndPRs: response.data.items, // .items contains the results
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Issues and Pull Requests',
      error: error.message,
    });
  }
});



app.get('/repos/getpr', async (req, res) => {
    try {
      // Fetch issues and pull requests from the repo
      const response = await octokit.rest.search.issuesAndPullRequests({
        q: `repo:${req.query.owner}/${req.query.repo} is:pull-request`,
        sort: 'created',
        order: 'desc'
      });
  
      res.status(200).json({
        message: 'Issues and Pull Requests fetched successfully',
        issuesAndPRs: response.data.items, // .items contains the results
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching Issues and Pull Requests',
        error: error.message,
      });
    }
  });
  





  app.post('/repos/postpr', async (req, res) => {
    try {
      const { owner, repo, title, head, base, body } = req.body;
  
      // Create the pull request
      const response = await octokit.rest.pulls.create({
        owner: owner, // Owner of the repository
        repo: repo,   // Repository name
        title: title, // Pull request title
        head: head,   // The name of the branch where your changes are implemented
        base: base,   // The name of the branch you want to merge your changes into
        body: body,   // Pull request description
      });
  
      // Send success response
      res.status(201).json({
        message: 'Pull Request created successfully',
        pull_request: response.data,
      });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({
        message: 'Error creating Pull Request',
        error: error.message,
      });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});