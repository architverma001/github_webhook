// webhookServer.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000; // You can change this to any available port

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the endpoint to receive webhooks
app.post('/webhook', (req, res) => {
    const event = req.headers['x-github-event']; // Get the event type from headers
    console.log(`Received event: ${event}`); // Log the event type

    // Log the payload for the event
    console.log('Payload:', JSON.stringify(req.body, null, 2));

    // Respond with a 200 OK status
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
