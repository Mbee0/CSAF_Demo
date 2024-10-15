<script setup>
import { ref } from 'vue';
import Inbox from './components/Inbox.vue';
import EmailViewer from './components/EmailViewer.vue';
import ClassificationButtons from './components/ClassificationButtons.vue';
import HelpButton from './components/HelpButton.vue';
import EmailGenerator from './components/EmailGenerator.vue';

const emails = ref([
  {
    id: 1,
    subject: 'Urgent: Account Verification Required',
    from: 'Security Team <security@example.com>',
    to: 'user@example.com',
    date: '2023-05-15 10:30 AM',
    summary: 'Request for immediate account verification due to suspicious activity.',
    body: 'Dear user,\n\nWe have detected suspicious activity on your account. Please click the link below to verify your identity immediately:\n\nhttps://secure-verify.example.com/verify?id=123456\n\nIf you do not verify your account within 24 hours, it will be suspended.\n\nBest regards,\nSecurity Team',
    isPhishing: true,
    hints: ['Urgency in the subject', 'Generic greeting', 'Suspicious link', 'Threat of account suspension']
  },
  {
    id: 2,
    subject: 'Your latest invoice',
    from: 'YourCompany Billing Team <billing@yourcompany.com>',
    to: 'customer@example.com',
    date: '2023-05-14 2:45 PM',
    summary: 'Monthly invoice for May 2023 services.',
    body: 'Dear Valued Customer,\n\nPlease find attached your latest invoice (#INV-2023-05) for services rendered in May 2023.\n\nIf you have any questions about this invoice, please don\'t hesitate to contact our billing department at billing@yourcompany.com or call us at (555) 123-4567.\n\nThank you for your business!\n\nBest regards,\nYourCompany Billing Team',
    isPhishing: false,
    hints: ['Expected sender', 'No urgent action required', 'Professional tone', 'Specific invoice details']
  }
]);

const currentEmail = ref(null);
const activeTab = ref('inbox');

const selectEmail = (email) => {
  currentEmail.value = email;
};

const classifyEmail = (isPhishing) => {
  if (currentEmail.value.isPhishing === isPhishing) {
    alert('Correct classification!');
  } else {
    alert('Incorrect. Try again and use the help button for hints.');
  }
};

const switchTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'inbox') {
    currentEmail.value = null;
  }
};
</script>

<template>
  <div class="app">
    <header>
      <h1>
        <img src="./images/logo.png">
        <button onclick=" window.open('https://linktr.ee/cppdsai','_blank')">

          Data Science and AI Phishing Email Trainer</button>
      </h1>
      <nav>
        <button @click="switchTab('inbox')" :class="{ active: activeTab === 'inbox' }">Inbox</button>
        <button @click="switchTab('generator')" :class="{ active: activeTab === 'generator' }">Email Generator</button>
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
  color: #5f6368;
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
  font-size: 16px;
  padding: 10px 15px;
  cursor: pointer;
  color: #5f6368;
}

nav button.active {
  color: #4285f4;
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
  border-color: #5f6368;
}
</style>