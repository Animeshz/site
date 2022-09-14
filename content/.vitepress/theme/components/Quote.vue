<script setup>
const props = defineProps(['author']);
</script>

<template>
    <div class="custom-block quote" style="">
        "<slot />"
        <div v-if="props.author" style="text-align: right">- {{ props.author }}</div>
    </div>
</template>

<style scoped>
.quote {
    font-size: 16px;
    padding: 16px 20px;
    margin: 25px 0;
    color: skyblue;
    border: 1px solid rgb(75, 75, 75);
    background-color: rgb(50, 50, 50);
}
</style>
