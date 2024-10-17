<template>
  <div>
    <h2>Email Generator & Phishing Analyzer</h2>
    <button @click="generateEmail">Generate Email</button>
    <p v-if="generatedEmail">{{ generatedEmail }}</p>
    <button
      v-if="generatedEmail"
      @click="analyzeEmailForPhishing(generatedEmail)"
    >
      Analyze for Phishing
    </button>
    <div v-if="analysisResult">
      <h3>Analysis Result:</h3>
      <p>{{ analysisResult }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      generatedEmail: "",
      analysisResult: "",
    };
  },
  methods: {
    async generateEmail() {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4-turbo",
            messages: [
              { role: "system", content: "You are an email assistant." },
              {
                role: "user",
                content:
                  "Write a professional email about scheduling a meeting.",
              },
            ],
            max_tokens: 200,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );
        this.generatedEmail = response.data.choices[0].message.content;
      } catch (error) {
        console.error("Error generating email:", error);
      }
    },
    async analyzeEmailForPhishing(emailContent) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4-turbo",
            messages: [
              { role: "system", content: "You are an email security expert." },
              {
                role: "user",
                content: `Analyze the following email to determine if it may be phishing. Provide a 'Yes' or 'No' answer and explain why.\n\nEmail:\n${emailContent}`,
              },
            ],
            max_tokens: 200,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );
        this.analysisResult = response.data.choices[0].message.content;
      } catch (error) {
        console.error("Error analyzing email:", error);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>
