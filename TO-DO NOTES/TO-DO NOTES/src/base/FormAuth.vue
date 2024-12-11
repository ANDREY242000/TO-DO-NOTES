<template>
  <a-form-item
    class="modal_input"
    name="email"
    :rules="[{ required: true, message: 'Please input your email!' }]"
  >
    <a-input v-model:value="formState.email" placeholder="Введите почту" />
  </a-form-item>

  <a-form-item
    class="modal_input"
    name="password"
    :rules="[{ required: true, message: 'Please input your password!' }]"
  >
    <a-input-password
      v-model:value="formState.password"
      placeholder="Введите пароль"
    />
  </a-form-item>

  <a-button
    class="modal_button"
    type="primary"
    html-type="submit"
    @click="singIn"
    >Войти</a-button
  >
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router/router";

const formState = reactive({
  email: "",
  password: "",
});

const singIn = () => {
  axios
    .post("https://todo-list.edu-playground.ru/api/v1/auth/signin", {
      formData: {
        email: formState.email,
        password: formState.password,
      },
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      router.push("/board");
    })
    .catch((error) => {
      alert("неверный логин или пароль!", error);
    });
};
</script>

<style lang="scss">
@use "/src/assets/variables.scss" as *;

.modal_input {
  width: 100%;
}

.modal_button {
  width: 70%;
  border-radius: 25px;
}
</style>
