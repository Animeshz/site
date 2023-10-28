<script setup>
const props = defineProps(['author']);
</script>

<!-- https://github.com/vuejs/vitepress/issues/770 (HTML and content must be separated by atleast one extra blank line) -->
<template>
    <div class="quote">
        <slot />
        <p v-if="props.author" style="text-align: right">- {{ props.author }}</p>
    </div>
</template>

<style scoped>
.quote {
    font-size: 16px;
    padding: 0 20px;
    margin: 25px 0;
    border: 1.5px solid #777;
    border-radius: 8px;
}
</style>
