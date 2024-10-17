<script setup>
import { ref } from "vue";
import axios from "axios";

const topic = ref("");
const generatedEmail = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const recipientName = ref("exampleuser@gmail.com");

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
  errorMessage.value = "";

  try {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    // Make the API request with gpt-4-turbo and correct JSON payload
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const emailData = response.data.choices[0].message.content.trim();
    generatedEmail.value = JSON.parse(emailData);
  } catch (error) {
    console.error("Error generating email:", error);
    errorMessage.value = "Failed to generate email. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="email-generator">
    <h2>Generate Personalized Phishing Email</h2>
    <div class="search-bar">
      <input
        v-model="topic"
        placeholder="Enter a topic for the phishing email"
      />
      <button @click="generateEmail" :disabled="isLoading">
        {{ isLoading ? "Generating..." : "Generate Email" }}
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
}

input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

button:disabled {
  background-color: #dadce0;
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
