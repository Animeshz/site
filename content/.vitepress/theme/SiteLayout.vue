<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      <!-- TODO: Add share button as present in zola -->
    </template>
    
    <template #layout-bottom>
      <!-- TODO: Add social links like https://fasterthanli.me -->
    </template>
  </Layout>
</template>