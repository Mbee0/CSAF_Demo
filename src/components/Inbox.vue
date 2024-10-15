<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['emails']);
const emit = defineEmits(['selectEmail']);

const selectEmail = (email) => {
  emit('selectEmail', email);
};
</script>

<template>
  <div class="inbox">
    <h2>Inbox</h2>
    <div class="email-list">
      <div
        v-for="email in emails"
        :key="email.id"
        class="email-item"
        @click="selectEmail(email)"
      >
        <div class="email-subject">{{ email.subject }}</div>
        <div class="email-summary">{{ email.summary }}</div>
        <div class="email-date">{{ email.date }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inbox {
  width: 300px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  height: 100%;
  background-color: #f1f3f4;
  position: fixed;
  left: 0px;
}
h2 {
  padding: 10px 15px;
  margin: 0;
  font-size: 18px;
  color: #202124;
  border-bottom: 1px solid #e0e0e0;
}
.email-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.email-item {
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  background-color: #ffffff;
}
.email-item:hover {
  background-color: #f1f3f4;
}
.email-subject {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.email-summary {
  color: #5f6368;
  margin-bottom: 5px;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.email-date {
  font-size: 0.8em;
  color: #5f6368;
}
</style>