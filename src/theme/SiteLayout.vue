<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      <PageActions />
    </template>

    <template #doc-footer-before>
      <div v-if="frontmatter.patreon !== false">
        <br>
        <PatreonButton />
      </div>
    </template>

    <template #doc-before>
      <div class="custom-block">
        Cool Tip: Turn on dark mode for better experience!
      </div>
    </template>

    <template #doc-after>
      <BlogNav />
    </template>

    <template #layout-bottom>
      <!-- TODO: Add social links like https://fasterthanli.me -->
    </template>
  </Layout>
</template>
