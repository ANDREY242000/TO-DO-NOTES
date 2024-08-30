<template>
   <header-component/> 
   <div class="mainWrap">
   <div class="main_conteiner">
    <h1>TO-DO...<br>
        не запоминай а записывай</h1>
      <div class="container">
          <h1>Регистрация</h1>
              <div class="form-group">
                  <label for="username">Имя пользователя</label>
                  <input type="text" id="username" name="username" required v-model="name">
              </div>
              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required v-model="email">
              </div>
              <div class="form-group">
                  <label for="password">Пароль</label>
                  <input type="password" id="password" name="password" required v-model="password">
              </div>
              <div class="form-group">
                  <label for="confirm-password">Подтверждение пароля</label>
                  <input type="password" id="confirm-password" name="confirm-password" required v-model="confirm_password">
              </div>
              <button type="submit" @click='singUp'>Зарегистрироваться</button>
              <p>уже есть аккаунт?<a @click='pushAuth' >Войти </a></p>
</div>
   </div>
    </div>
   <footer-component />
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import HeaderComponent from '@/component/HeaderComponent.vue'
import FooterComponent from '@/component/FooterComponent.vue'



export default defineComponent({
  name:'TheRegister',


  components:{
    HeaderComponent,
    FooterComponent
},

data(){
    return {
            name: '',
            email:'',
            password:'',
            confirm_password:''

        }
    },

  methods:{
      singUp () {
     axios.put('https://todo-list.edu-playground.ru/api/v1/auth/signup',{
        "formData": {
        "name": this.name,
        "email": this.email,
        "password": this.password,
        "confirm_password": this.confirm_password
  }
    })   
    .then(response => {
    if (response.status === 200) {
      // Перенаправление пользователя на страницу аутентификации
      this.$router.push('/auth');
    } else {
      alert('Упс, что-то сломалось');
    }
  })
  .catch(error => {
    alert('Недостаточно символов в имени или никнейм занят', error);
  });
    
},
pushAuth(){
      this.$router.push('/auth');
    },
  }
    })
    

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
  margin: 10px auto;
  padding: 10px;

}

.container {
  margin: 20px;
  max-width: 50vh;
  padding: 20px;
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

