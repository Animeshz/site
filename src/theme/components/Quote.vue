<script setup>
const props = defineProps(['author']);
</script>

<template>
    <div class="custom-block quote">
        <slot />
        <div v-if="props.author" style="text-align: right">- {{ props.author }}</div>
    </div>
</template>

<style scoped>
.quote {
    font-size: 16px;
    padding: 16px 20px;
    margin: 25px 0;
    color: var(--vp-c-white);
    border: 1px solid var(--vp-c-indigo-darker);
    background-color: var(--vp-c-gray-dark-1);
}

html.dark .quote {
    color: var(--vp-c-indigo-lighter);
    background-color: var(--vp-c-gray-dark-3);
}
</style>
