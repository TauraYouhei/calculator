<template>
    <transition appear>
        <header class="space">
            <supabase-function ref="childSupa" />
            <div class="register">
                <h1>ログイン</h1>

                <input type="input" v-model="loginUser.value" placeholder="ユーザ名">
                <div class="error">{{loginUser.error_msg}}</div>

                <input type="password" v-model="loginPassword.value" placeholder="パスワード">
                <div class="error">{{loginPassword.error_msg}}</div>
                <div class="n-btn">
                    <button v-on:click="loginButton">次へ</button>
                </div>
            </div>
        </header>
    </transition>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';

export default {
    name: "LoginView",
    components: {
        supabaseFunction,
    },
    data () {
        return {
            result: [],
            loginUser: {
                value: "",
                error_msg: "",
            },
            loginPassword: {
                value: "",
                error_msg: "",
            },
        }
    },
    methods: {
      async loginButton() {
        this.result=await this.$refs.childSupa.loginCheck(this.loginUser.value, this.loginPassword.value);
        this.loginUser.error_msg=this.result.nameError;
        this.loginPassword.error_msg=this.result.passwordError;

        if(this.result.flag){
          this.$store.commit('setUserName', this.loginUser.value)
          this.loginUser.value = this.loginPassword.value = "";
          this.$router.push('/mypage')
        }
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

.space {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #292929;
}
.register {
  width: 100%;
}
h1 {
  color: #bdc3c7;
  padding: 7.5rem 0 0.8em 0;
  width: 100%;
  text-align: center;
}

.error {
  color: red;
  margin: 0 1rem;
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
  margin-top: 2.5rem;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 0;
  color: #bdc3c7;
  transition: all 0.6s;
  display: block;
  margin: 0 0 0 auto;
}
button:hover {
  cursor:pointer;
  background: #18a5aa;
}
.n-btn {
  padding: 10%;
}


</style>
