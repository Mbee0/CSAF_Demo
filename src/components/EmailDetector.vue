<script setup>
import { ref } from "vue";
import axios from "axios";

const topic = ref("");
const generatedEmail = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const recipientName = ref("exampleuser@gmail.com");

const detectEmail = async () => {
  const prompt = `
    You are a cybersecurity expert who specializes in identifying spam emails. I am going to give you a spam email and I want you to 
    analyze said email and return to me these major points in this order and format:
    Phishing Probability: {low, medium, high}
    Suspicious Elements: (list out possible suspicious elements here)
    Recommended Actions: (Possible recommended actions for the user to check if this is a phishing email for themself or how to keep themself safe)
    Explanation: (Explain the suspicious elements and why this is or isn't a phishing email)
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
        model: "gpt-3.5-turbo",
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
    generatedEmail.value = emailData;
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
    <h2>Phishing Email Analyzer</h2>
    <div class="search-bar">
      <textarea
        v-model="topic"
        placeholder="Paste the email content here for analysis"
        rows="20"
      >
      </textarea>
      <button @click="detectEmail" :disabled="isLoading">
        {{ isLoading ? "Analyzing..." : "Analyze Email" }}
      </button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div v-if="generatedEmail" class="generated-email">
      <h3>Email Analysis Completed!</h3>
      <div class="email-content">
        <div class="email-body">{{ generatedEmail }}</div>
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

textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  resize: vertical; /* Allows user to adjust height */
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
