<script setup>
import { ref } from 'vue';
import openai from '../assets/openai.js';
// import axios from 'axios';

const topic = ref('');
const generatedEmail = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');
const recipientName = ref('exampleuser@gmail.com')

const generateEmail = async () => {
    const prompt = `
    Write a phishing email that appears to be from a sender relevant to the topic. 
    The email should pretend to be about "${topic.value}", using urgency and a call to action to click a malicious link. 
    Include elements that demonstrate typical phishing tactics:
    - An urgent subject line
    - A generic greeting
    - A sense of urgency and a call to action
    - A suspicious-looking link that pretends to be legitimate

    The output should be a JSON object with the following structure:
    {
      "subject": "<subject>",
      "from": "<sender email>",
      "date": "<current date>",
      "body": "<email body>"
    }
  `;
    isLoading.value = true;
    errorMessage.value = '';

    try {
        const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Replace with your model endpoint
        const apiKey = 'your_openai_api_key_here'; // Replace with your actual OpenAI API key

        // Prepare the request payload
        const requestBody = JSON.stringify({
            prompt: prompt,
            max_tokens: 150, // Adjust tokens based on expected length
            temperature: 0.7 // Adjust creativity level
        });

        // Fetch request to OpenAI API
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'hi, how are you?' }],
            model: 'gpt-3.5-turbo'
        });
        if (!response.ok) {
            throw new Error('Failed to generate email');
        }

        console.log(response.choices[0].message)

        // const data = await response.json();
        // console.log(data.value)

        // Process data with Instructor library if needed
        // let emailData = data.choices[0].text;

        // // Use Instructor library if specific formatting or structuring is required
        // if (typeof Instructor !== 'undefined') {
        //     emailData = Instructor.process(emailData); // Adjust based on Instructor’s method for processing
        // }

        // generatedEmail.value = {
        //     subject: 'Generated Email Subject', // Customize based on the email data returned
        //     from: 'Generated Sender <no-reply@example.com>',
        //     to: 'user@example.com',
        //     date: new Date().toLocaleString(),
        //     body: emailData // or parse and format as needed
        // };
    } catch (error) {
        console.error('Error generating email:', error);
        errorMessage.value = 'Failed to generate email. Please try again.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="email-generator">
        <h2>Generate Personalized Phishing Email</h2>
        <div class="search-bar">
            <textarea v-model="topic" placeholder="Enter a topic for the phishing email"></textarea>
            <!-- {{ isLoading ? 'Generating...' : 'Generate Email' }} -->
            <button @click="generateEmail" :disabled="isLoading">
            </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div v-if="generatedEmail" class="generated-email">
            <h3>New Email Received!</h3>
            <div class="email-content">
                <div class="email-header">
                    <div class="email-from">{{ generatedEmail.from }}</div>
                    <div class="email-to">To: {{ generatedEmail.to }}</div>
                    <div class="email-date">{{ generatedEmail.date }}</div>
                    <h2>{{ generatedEmail.subject }}</h2>
                </div>
                <div class="email-body">{{ generatedEmail.body }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.email-generator {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    overflow-y: auto;
    height: 100%;
}

.search-bar {
    display: flex;
    margin-bottom: 20px;
    border-radius: 8px;
    border-width: 0px;
}

textarea {
    flex-grow: 1;
    padding: 20px;
    font-size: 16px;
    border: 0px solid #dadce0;
    border-radius: 15px;
}

textarea:focus {
    outline: none;
}

button {
    margin: 5px 15px;
    background: url('../images/go1.webp');
    background-size: contain;
    background-repeat: no-repeat;
    padding: 8px 10px;
    font-size: 16px;
    /* background-color: #4285f4; */
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    width: 52px;
}

button:disabled {
    background: url('../images/go.webp');
    /* background-color: #dadce0; */
}

.generated-email {
    margin-top: 20px;
    border: 1px solid #dadce0;
    border-radius: 8px;
    padding: 20px;
    background-color: #f1f3f4;
}

.email-content {
    background-color: white;
    padding: 20px;
    border: 1px solid #dadce0;
    border-radius: 8px;
}

.email-header {
    margin-bottom: 20px;
    position: relative;
}

.email-header h2 {
    margin-top: 10px;
    margin-bottom: 0;
    color: #202124;
    font-size: 18px;
}

.email-from {
    font-weight: bold;
    margin-bottom: 5px;
}

.email-to {
    color: #5f6368;
    margin-bottom: 5px;
}

.email-date {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    color: #5f6368;
}

.email-body {
    white-space: pre-wrap;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin-top: 10px;
    text-align: left;
}

.error-message {
    color: #f44336;
    margin-top: 10px;
}
</style>