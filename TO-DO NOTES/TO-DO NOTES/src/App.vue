
<template>
  <router-view></router-view>
  <router-link :to="'/'"></router-link>
  <router-link :to="'/auth'"></router-link>
  <router-link :to="'/auth/board'"></router-link>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheApp",

  components: {},
});
</script>

<style >
* {
  font-family: "Montserrat", sans-serif;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  background: #e8cbea;
  position: relative;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 380px;
}

html {
  min-width: 380px;
}

.header__title,
.footer__text {
  margin: 0;
  padding: 10px 0;
}

.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container {
    max-width: 540px;
    margin: 0;
    padding: 0;
  }
}

@media screen and (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media screen and (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media screen and (min-width: 992px) {
  .container {
    max-width: 960px;
  }

  .kanban__column {
    flex: 0 0 calc(33.333% - 20px);
  }
}

@media screen and (max-width: 992px) {
  .kanban {
    width: 100%;
    padding: 20px;
  }

  .kanban__column {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media screen and (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
</style>
