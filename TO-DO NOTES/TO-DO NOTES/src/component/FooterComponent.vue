<template>
  <footer class="footer">
    <p class="footer__text">To-Do-List-Kanban</p>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'FooterComponent'
});
</script>

<style>
.footer {
  border-radius: 15px;
  background-color: #c6bfe7;
  align-items: baseline;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 0;
}
.footer__text {
  margin: 0;
  padding: 10px 0;
}
</style>