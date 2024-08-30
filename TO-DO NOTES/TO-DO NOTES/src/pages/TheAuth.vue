<template>
  <header-component />
  <div class="mainWrap">
    <div class="main_conteiner">
      <h1>TO-DO...<br />не запоминай а записывай</h1>
    <div class="container">
      <h1>Aвторизация</h1>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          v-model="password"
        />
      </div>
      <button type="submit" @click="singIn">Авторизироваться</button>
    </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import HeaderComponent from "@/component/HeaderComponent.vue";
import FooterComponent from "@/component/FooterComponent.vue";

export default defineComponent({
  name: "TheAuth",

  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    singIn() {
      axios
        .post("https://todo-list.edu-playground.ru/api/v1/auth/signin", {
          formData: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          // Сохраняем ответ в localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          // Проверяем, что токен успешно сохранен
          // if (localStorage.getItem('token') !== null) {
          //   // Перенаправление пользователя на страницу досок
          this.$router.push("/auth/board");
          // } else {
          //   alert('Упс, что-то сломалось');
          // }
        })
        .catch((error) => {
          alert("неверный логин или пароль!", error);
        });
    },
  },
});
</script>

<style scoped>
.mainWrap {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  position: relative;
}

.main_conteiner {
  margin: 50px auto;
  padding: 20px;
  align-items: center;
  justify-content: center;

}

.container {
  margin: 50px;
  max-width: 50vh;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
