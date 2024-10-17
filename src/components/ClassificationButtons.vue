<script setup>
const emit = defineEmits(['classify']);
</script>

<template>
    <div class="classification-buttons">
        <button @click="emit('classify', false)" class="legitimate">Legitimate</button>
        <button @click="emit('classify', true)" class="phishing">Phishing</button>
    </div>
</template>

<style scoped>
.classification-buttons {
    margin-bottom: 20px;
}

button:focus {
    outline: none;
}

button {
    padding: 10px 20px;
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
}

.legitimate {
    background-color: #4CAF50;
    color: white;
}

.phishing {
    background-color: #f44336;
    color: white;
}
</style>