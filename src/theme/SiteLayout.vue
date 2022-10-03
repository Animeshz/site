<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      <PageActions />
    </template>

    <template #layout-bottom>
      <!-- TODO: Add social links like https://fasterthanli.me -->
    </template>
  </Layout>
</template>
