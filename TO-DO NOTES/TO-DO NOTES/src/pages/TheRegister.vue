<template>
  <div class="wrapper">
    <header-component class="header">
      <a-button class="button" @click="visibleAuth">Вход</a-button>
      <a-button class="button" @click="visibleReg">Регистрация</a-button>
    </header-component>
    <div class="container-register">
      <div class="form">
        <h2 class="title-modal">Hello TO-DO!</h2>
        <FormReg
          class="FormReg"
          v-if="FormRegVisible"
          @singUp="pushBoard"
        ></FormReg>
        <FormAuth v-if="FormAuthVisible"></FormAuth>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/component/HeaderComponent.vue";
import FormReg from "@/base/FormReg.vue";
import FormAuth from "@/base/FormAuth.vue";

export default defineComponent({
  name: "TheRegister",

  components: {
    HeaderComponent,
    FormReg,
    FormAuth,
  },

  data() {
    return {
      FormRegVisible: true,
      FormAuthVisible: false,
    };
  },

  methods: {
    visibleReg() {
      (this.FormRegVisible = true), (this.FormAuthVisible = false);
    },

    visibleAuth() {
      (this.FormAuthVisible = true), (this.FormRegVisible = false);
    },
  },
});
</script>

<style lang="scss" scoped>
@use "/src/assets/variables.scss" as *;

.wrapper {
  background-color: $Bgcolor_register;
  position: relative;
  height: 100vh;
  width: auto;
}

.header {
  position: absolute;
  width: 100vw;
  z-index: 2;

  .button {
    font-weight: 400;
    color: white;
    font-size: 15px;
    background-color: $Bgcolor_header;
    border: #100f0f;
  }
}

.container-register {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    background-color: $Bgcolor_modal_register;
    border: 2px solid #4e4545;
    box-shadow: 0 8px 16px rgba(69, 68, 68, 0.299);
    position: fixed;
    width: 340px;
    height: 400px;
    padding: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
}
</style>
