<!-- Very much inspired from: https://github.com/airene/vitepress-blog-pure/blob/main/.vitepress/theme/custom.css -->

<script setup>
import { withBase } from 'vitepress'
import blogs from '../cache/blogs.json'
</script>

<template>
    <div v-for="blog in blogs" class="list">
        <div class="list-header">
            <div class="list-li">
                <a :href="withBase(blog.regular_path)"> {{ blog.frontmatter.title }}</a>
            </div>
            <time class="date">
                {{ blog.frontmatter.created.string }}
            </time>
        </div>

        <div class="describe">
            <span v-for="tag in blog.frontmatter.tags">#{{tag}}</span>
        </div>
    </div>
</template>

<style scoped>
.list {
    border-bottom: 1px dashed var(--vp-c-divider-light);
    padding: 1rem 0 0 0;
}

.list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.list-li {
    font-size: 1.0625rem;
    font-weight: 500;
    margin: 0.1rem 0;
}

.describe {
    font-size: 0.875rem;
    display: inline-block;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 0.625rem 0 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.5px;
}

.describe > * {
    margin-right: 0.4rem;
}

.date {
    color: var(--vp-c-text-2);
    font-family: Georgia, sans-serif;
}

@media screen and (max-width: 720px) {
    .list {
        padding: 1rem 0 0 0;
    }

    .list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .list-li {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }

    .describe {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }

    .date {
        font-size: 0.8125rem;
    }
}
</style>
