<template>
  <header class="header">
    <div class="container header__container">
      <h1 class="header__title">TO-DO NOTES</h1>
      <div class="header__option">
        <slot></slot>
      </div>
    </div>
    <div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent'
});
</script>

<style>
header {
    margin-top: 10px;
}

.header__container {
    display: flex;
    justify-content: space-between;
    background: #9cb1f1;
    align-items: center;



}

.header__title {
    font-weight: 300;

}

.header__option {
    display: flex;
    align-items: center;
    gap: 15px;
}





</style>