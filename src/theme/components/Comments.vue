<template>
  <div id="gitalk-container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { onContentUpdated, useRouter, useData } from "vitepress";

import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

const { page } = useData()

function deleteChild() {
  const element = document.querySelector("#gitalk-container");
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}

const runnable = () => {
  deleteChild();
  if (page.value.relativePath.includes('blogs/') && !page.value.relativePath.includes('index.md')) {
    const gitalk = new Gitalk({
      clientID: "f976b2cfed30bf9660d9",
      clientSecret: "87b8e9f191892dad5eb7150efac78cf0b02cce56",
      repo: "site",
      owner: "Animeshz",
      admin: ["Animeshz"],
      id: location.pathname.substring(0, 50), // Ensure uniqueness and length less than 50
      language: "en-IN",
      distractionFreeMode: true,
      title: generateIssueTitle(),
    });
    gitalk.render("gitalk-container");
  }
};

const generateIssueTitle = () => {
  const prefix = "[COMMENT]";
  return `${prefix} ${document.title}`;
};

onContentUpdated(runnable);
</script>

<style>
html.dark #gitalk-container svg {
  fill: #adbac7;
}

html.dark #gitalk-container textarea {
  background-color: #22272e;
}

html.dark #gitalk-container .gt-comment-content {
  background-color: #22272e;
}

#gitalk-container .gt-comment-content:hover {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

html.dark #gitalk-container .gt-comment-content .gt-comment-body {
  color: #ccc !important;
}
</style>