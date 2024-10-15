<script setup>
import { ref } from 'vue';

const props = defineProps({
  hints: Array
});

const showHints = ref(false);

const toggleHints = () => {
  showHints.value = !showHints.value;
};
</script>

<template>
  <div class="help-button">
    <button @click="toggleHints">{{ showHints ? 'Hide Help' : 'Show Help' }}</button>
    <ul v-if="showHints">
      <li v-for="(hint, index) in hints" :key="index">{{ hint }}</li>
    </ul>
  </div>
</template>

<style scoped>
.help-button {
  margin-bottom: 20px;
}
ul {
  text-align: left;
}
</style>