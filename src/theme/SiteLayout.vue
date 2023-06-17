<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <!-- Donation Button? -->
    </template>

    <template #doc-before>
    </template>

    <template #doc-after>
      <BlogNav />
      <Comments />
    </template>

    <template #layout-bottom>
      <!-- Social Links | Copyright? -->
    </template>
  </Layout>
</template>
