<script setup>
import { ref, onMounted } from "vue";
import Inbox from "./components/Inbox.vue";
import EmailViewer from "./components/EmailViewer.vue";
import ClassificationButtons from "./components/ClassificationButtons.vue";
import HelpButton from "./components/HelpButton.vue";
import EmailGenerator from "./components/EmailGenerator.vue";
import EmailDetector from "./components/EmailDetector.vue";

const emails = ref([]);

const currentEmail = ref(null);
const activeTab = ref("inbox");

const fetchEmails = async () => {
  // console.log("im being called?")
  try {
    const response = await fetch("/emails.json");
    if (!response.ok) {
      throw new Error("Failed to load emails.");
    }
    // console.log("uoainsdf")
    let data = await response.json();
    // console.log("wait")
    console.log(data.emails);
    emails.value = data.emails;
  } catch (error) {
    console.error("Error loading emails:", error);
  }
};

onMounted(() => {
  fetchEmails();
  // print("am i being called?");
});

const selectEmail = (email) => {
  currentEmail.value = email;
};

const classifyEmail = (isPhishing) => {
  if (currentEmail.value.isPhishing === isPhishing) {
    alert("Correct classification!");
  } else {
    alert("Incorrect. Try again and use the help button for hints.");
  }
};

const switchTab = (tab) => {
  activeTab.value = tab;
  if (tab === "inbox") {
    currentEmail.value = null;
  }
};
</script>

<template>
  <div class="app">
    <header>
      <h1>
        <img src="./images/logo.png" />
        <button onclick=" window.open('https://linktr.ee/cppdsai','_blank')">
          Data Science and AI Phishing Email Trainer
        </button>
      </h1>
      <nav>
        <button
          @click="switchTab('inbox')"
          :class="{ active: activeTab === 'inbox' }"
        >
          Inbox
        </button>
        <button
          @click="switchTab('generator')"
          :class="{ active: activeTab === 'generator' }"
        >
          Email Generator
        </button>
        <button
          @click="switchTab('detector')"
          :class="{ active: activeTab === 'detector' }"
        >
          Email Analysis
        </button>
      </nav>
    </header>
    <main>
      <div v-if="activeTab === 'inbox'" class="inbox-view">
        <Inbox :emails="emails" @select-email="selectEmail" />
        <div v-if="currentEmail" class="email-details">
          <EmailViewer :email="currentEmail" />
          <ClassificationButtons @classify="classifyEmail" />
          <HelpButton :hints="currentEmail.hints" />
        </div>
        <div v-else class="no-email-selected">
          <p>Select an email to view its contents</p>
        </div>
      </div>
      <EmailGenerator v-if="activeTab === 'generator'" />
      <EmailDetector v-if="activeTab === 'detector'" />
    </main>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.app {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: #f8f9f9;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* background-color: #f1f3f4; */
  background-color: #3a7faa;
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
}

h1 {
  color: #4285f4;
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

h1 button {
  background: none;
  border: none;
  font-size: 32px;
  padding: 10px 15px;
  cursor: pointer;
  color: #192642;
}

h1 button:hover {
  color: #233d75;
  /* border-bottom: 3px solid #4285f4; */
}

h1 button:active {
  color: #3ba5b6;
  font-size: 31px;
  /* text-decoration: underline; */

  /* border-bottom: 3px solid #4285f4; */
}

h1 button:focus {
  outline: none;
}

h1 img {
  width: 50px;
  height: 50px;
}

nav {
  display: flex;
}

nav button {
  background: none;
  border: none;
  font-size: 24px;
  padding: 10px 15px;
  cursor: pointer;
  color: #192642;
  transition: color 0.25s;
}

nav button:hover {
  color: #3e5a96;
  /* border-bottom: 3px solid #4285f4; */
}

nav button.active {
  color: #44c0d3;
  /* text-decoration: underline; */

  /* border-bottom: 3px solid #4285f4; */
}

nav button:active {
  color: #3ba5b6;
  font-size: 23px;
  /* text-decoration: underline; */

  /* border-bottom: 3px solid #4285f4; */
}

nav button:focus {
  outline: none;
}

main {
  flex-grow: 1;
  display: flex;
  margin-top: 60px;
  height: calc(100vh - 60px);
}

.inbox-view {
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 400px;
  padding: 0;
  padding-top: 20px;
}

.email-details {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
}

.no-email-selected {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #5f6368;
  background-color: #f1f3f4;
  margin: 5px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
}
</style>
