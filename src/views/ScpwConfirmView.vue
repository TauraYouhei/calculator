<template>
    <transition appear>
        <header class="space">
          <supabase-function ref="childSupa" />
            <div class="register">
                <h1>秘密パスワードの登録</h1>

                <input type="password" v-model="scpw.value" placeholder="パスワード">
                <div class="error">{{scpw.error_msg}}</div>

                <input type="password" v-model="scpwConfirm.value" placeholder="パスワード(確認)">
                <div class="error">{{scpwConfirm.error_msg}}</div>
                <p>※ここで決めたPWを電卓で打つとマイページが開きます。</p>
                <p>※使用できる文字：0～9、+、-、*、/</p>
                <div class="n-btn">
                    <button v-on:click="nextButton">次へ</button>
                </div>
            </div>
        </header>
    </transition>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';

export default {
    name: "ScpwConfirmView",
    components: {
        supabaseFunction,
    },
    data () {
        return {
            scpw: {
                value: "",
                error_msg: "",
            },
            scpwConfirm: {
                value: "",
                error_msg: "",
            },
        }
    },
    methods: {
      async nextButton() {
        this.result=await this.$refs.childSupa.errorSecretCheck(this.scpw.value, this.scpwConfirm.value);
        this.scpw.error_msg=this.result.passwordError;
        this.scpwConfirm.error_msg=this.result.passwordConfirmError;

        if(this.result.flag){
          this.$refs.childSupa.sendSecretPassword(this.scpw.value);
          this.scpw.value = this.scpwConfirm.value = "";
          this.$router.push('/login')
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
p {
  color: #bdc3c7;
  width: 90%;
  margin: 2.0rem 1.0rem 1.0rem 1.0rem;
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
