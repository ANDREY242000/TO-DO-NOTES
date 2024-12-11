<template>
  <router-view></router-view>
  <router-link :to="'/register'"></router-link>
  <router-link :to="'/register/board'"></router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheApp",
});
</script>

<style></style>
