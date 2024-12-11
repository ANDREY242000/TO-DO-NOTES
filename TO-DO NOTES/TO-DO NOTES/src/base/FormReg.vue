<template>
  <a-form-item
    class="modal_input"
    name="username"
    :rules="[{ required: true, message: 'Please input your username!' }]"
  >
    <a-input v-model:value="formState.username" placeholder="Введите никнейм" />
  </a-form-item>

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

  <a-form-item class="modal_input" name="RepeatPassword">
    <a-input-password
      v-model:value="formState.confirm_password"
      placeholder="повторите пароль"
    />
  </a-form-item>

  <a-button
    class="modal_button"
    type="primary"
    html-type="submit"
    :FormAuthVisible="FormAuthVisible"
    @click="singUp"
    >Зарегистрироваться</a-button
  >
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router/router";

const formState = reactive({
  username: "",
  email: "",
  password: "",
  confirm_password: "",
});

const singUp = () => {
  axios
    .put("https://todo-list.edu-playground.ru/api/v1/auth/signup", {
      formData: {
        name: formState.username,
        email: formState.email,
        password: formState.password,
        confirm_password: formState.confirm_password,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // Перенаправление пользователя на страницу аутентификации
        router.push("/board");
      } else {
        alert("Упс, что-то сломалось");
      }
    })
    .catch((error) => {
      // alert('Недостаточно символов в имени или никнейм занят', error);
      console.log(formState.username);
      console.log(formState.email);
      console.log(formState.password);
      console.log(formState.username);
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
