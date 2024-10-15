<script setup>
defineProps({
    email: Object
});
</script>

<template>
    <div class="email-title-view">
        <h2>{{ email.subject }}</h2>
    </div>
    <div class="email-viewer">
        <div class="email-header">
            <div class="email-from">{{ email.from }}</div>
            <div class="email-to">To: {{ email.to }}</div>
            <div class="email-date">{{ email.date }}</div>
        </div>
        <div class="email-body">{{ email.body }}</div>
    </div>
</template>

<style scoped>
.email-viewer {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.email-title-view {
    background-color: #fff;
    text-align: left;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 5px;
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
    text-align: left;
}

.email-to {
    color: #5f6368;
    margin-bottom: 5px;
    text-align: left;
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
    color: #202124;
    text-align: left;
    width: 100%;
    margin: 10px;
}
</style>