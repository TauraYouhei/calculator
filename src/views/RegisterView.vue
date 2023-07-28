<template>
  <transition appear>
    <header class="space">
      <supabase-function ref="childSupa" />
      <div class="register">
        <h1>ユーザ登録</h1>
        <input class="input" v-model="name.value" placeholder="ユーザ名">
        <div class="error">{{name.error_msg}}</div>

        <input type="email" v-model="email.value" placeholder="メール">
        <div class="error">{{email.error_msg}}</div>

        <input type="password" v-model="pw.value" placeholder="パスワード">
        <div class="error">{{pw.error_msg}}</div>

        <input type="password" v-model="pwConfirm.value" placeholder="パスワード(確認)">
        <div class="error">{{pwConfirm.error_msg}}</div>

        <div class="n-btn">
          <button v-on:click="login">ログインの方は<span>こちら</span></button>
          <button v-on:click="nextButton">次へ</button>
        </div>
      </div>
    </header>
  </transition>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';

export default {
  name: "RegisterView",
  components: {
    supabaseFunction,
  },
  data() {
    return {
      result: [],
      name: {
        value: "",
        error_msg: "",
      },
      email: {
        value: "",
        error_msg: "",
      },
      pw: {
        value: "",
        error_msg: "",
      },
      pwConfirm: {
        value: "",
        error_msg: "",
      },
    };
  },
  methods: {
    async nextButton(){
      this.result=await this.$refs.childSupa.errorCheck(this.name.value, this.email.value, this.pw.value, this.pwConfirm.value);
      this.name.error_msg=this.result.nameError;
      this.email.error_msg=this.result.emailError;
      this.pw.error_msg=this.result.passwordError;
      this.pwConfirm.error_msg=this.result.passwordConfirmError;

      if(this.result.flag){
         this.$refs.childSupa.sendUserInfo(this.name.value, this.email.value, this.pw.value);
         this.$store.commit('setUserName', this.name.value)
         this.name.value = this.email.value = this.pw.value = this.pwConfirm.value = "";
         this.$router.push('/confirm');
      }
    },
    login(){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.v-enter-to {
  transition: transform 1.2s ease-out;
  transform: translateX(0px);
}
.v-enter-from {
  transform: translateX(-500px);
}

* {
  font-family: 'Maven Pro', sans-serif;
  box-sizing: border-box;
}

body,html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-image: linear-gradient(180deg, #37375A 70%, #31315A);
  text-align: center;
  font-family: 'Segoe UI';
}

.register {
  width: 100%;
}

input {
  width: 90%;
  background: transparent;
  border-bottom: solid 1px #18a5aa;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 1rem;
  transition: all 0.4s;
  color: #BDBDBD;;
  margin: 2.0rem 1.0rem 1.0rem 1.0rem;
}
input:focus {
  background: #18a5aa;
  transform: scale3d(1.01,1.01,1.01);
  color: black;
}

button {
  background: transparent;
  width: 40%;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 0;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 2.5rem 4.5%;
}
button:hover {
  cursor:pointer;
  background: #18a5aa;
}

h1 {
  color: #bdc3c7;
  padding: 7.5rem 0 0.8em 0;
  width: 100%;
  text-align: center;
}

.space {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #292929;
}

.error {
  color: red;
  margin: 0 1rem;
}

span {
  display: block;
}
</style>