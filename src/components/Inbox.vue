<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps(['emails']);
const emit = defineEmits(['selectEmail']);

const selectEmail = (email) => {
    emit('selectEmail', email);
};
</script>
<!-- :class="{ active: currentEmail.value && currentEmail.value.id === email.id }" -->
<template>
    <div class="inbox">
        <h2>Inbox</h2>
        <div class="email-list">
            <div v-for="email in emails" :key="email.id" class="email-item" @click="selectEmail(email)">
                <img src="../images/good.png" class="profile-img">
                <div class="brief-words">
                    <div class="email-subject">{{ email.subject }}</div>
                    <div class="email-summary">{{ email.summary }}</div>
                    <div class="email-date">{{ email.date }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.inbox {
    width: 400px;
    border: 1px solid #e0e0e0;
    overflow-y: auto;
    height: 100%;
    background-color: #f1f3f4;
    position: fixed;
    left: 0px;
    margin: 10px;
    border-radius: 5px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    background-color: #ffffff;
    width: 400px;
    /* display:flex;
  flex-direction: row; */
}

.email-item:hover {
    /* background-color: #f1f3f4; */
    background-color: #d5edf1;
}

.email-item:active {
    /* background-color: #f1f3f4; */
    background-color: #b2d8df;
}

/* .email-item.active {
    background-color: #30539f;
    display:flex;
  flex-direction: row; 
} */

div img {
    width: 45px;
    height: 45px;
    padding-right: 10px;
}



.email-subject {
    font-weight: bold;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.email-summary {
    color: #3a7faa;
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

.brief-words {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 300px;
}
</style>