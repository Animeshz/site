<script setup>
const props = defineProps(['author']);
</script>

<template>
    <p class="quote">
        <slot />
        <div v-if="props.author" style="text-align: right">- {{ props.author }}</div>
    </p>
</template>

<style scoped>
.quote {
    font-size: 16px;
    padding: 16px 20px;
    margin: 25px 0;
    border: 1.5px solid #777;
    border-radius: 8px;
}
</style>
