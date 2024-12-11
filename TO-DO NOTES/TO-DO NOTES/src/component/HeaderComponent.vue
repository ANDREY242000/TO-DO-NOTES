<template>
  <div class="header">
    <div class="container">
      <h1 class="header__title">TO-DO.ru</h1>
      <div class="container-button">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style lang="scss" scoped>
@use "/src/assets/variables.scss" as *;

.header {
  background-color: $Bgcolor_header;
  height: 80px;
  width: auto;
  display: flex;
  justify-content: space-between;

  .container {
    margin: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    h1 {
      font-style: $main_font_style;
      font-size: 36px;
      color: white;
    }

    .container-button {
      gap: 15px;
    }
  }
}
</style>
