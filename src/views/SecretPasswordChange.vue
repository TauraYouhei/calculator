<template>
    <transition appear>
        <header class="space">
          <supabase-function ref="childSupa" />
            <div class="register">
                <h1>秘密のパスワード変更</h1>

                <input type="password" v-model="nowPassword.value" placeholder="現在の秘密パスワード">
                <div class="error">{{nowPassword.error_msg}}</div>

                <input type="password" v-model="newPassword.value" placeholder="新しい秘密パスワード">
                <div class="error">{{newPassword.error_msg}}</div>

                <input type="password" v-model="newPasswordConfirm.value" placeholder="パスワード(確認)">
                <div class="error">{{newPasswordConfirm.error_msg}}</div>

                <div class="n-btn">
                    <router-link to="/config" class="router"><button v-on:click="back">戻る</button></router-link>
                    <button v-on:click="nextButton">変更</button>
                </div>
            </div>
        </header>
    </transition>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';

export default {
    name: "SecretPasswordChange",
    components: {
        supabaseFunction,
    },
    data () {
        return {
            nowPassword: {
                value: "",
                error_msg: "",
            },
            newPassword: {
                value: "",
                error_msg: "",
            },
            newPasswordConfirm: {
                value: "",
                error_msg: "",
            },
        }
    },
    methods: {
      async nextButton() {
        this.result=await this.$refs.childSupa.errorSecretPasswordChangeCheck(this.nowPassword.value, this.newPassword.value, this.newPasswordConfirm.value);
        this.nowPassword.error_msg=this.result.nowPasswordError;
        this.newPassword.error_msg=this.result.newPasswordError;
        this.newPasswordConfirm.error_msg=this.result.newPasswordConfirmError;

        if(this.result.flag){
          this.$refs.childSupa.sendSecretPassword(this.newPassword.value);
          this.newPassword.value = this.newPasswordConfirm.value = this.nowPassword.value = "";
          this.$router.push('/config')
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

.router {
    border: none;
    color: #bdc3c7;
    text-decoration: none;
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

</style>
