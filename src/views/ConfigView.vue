<template>
        <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <a id="Name">{{ $store.state.username }}</a>
            </header>
            <main class="mainView">
                <br><br><br><h2>設定</h2>
                <br><br><p class="info">●個人情報</p>
                <button v-on:click="nextButton">プロフィール画像</button>
                <router-link to="/config/pwChange"><button>パスワード</button></router-link>
                <router-link to="/config/scpwChange"><button>秘密のパスワード</button></router-link>
                <br><br><p class="info">●一般</p>
                
                <button v-on:click="logOut">ログアウト</button>

                <button v-on:click="Delete">アカウント削除</button>
                <div class="delete" v-show="this.flag"><br><br><br>本当にアカウントを削除しますか？<br>
                <button class="delButon" v-on:click="accountDelete">削除</button>
                <button class="delButon" v-on:click="backButton">戻る</button></div>

                <router-link to="/"><button>電卓画面へ</button></router-link>
            </main>
            <div class="dummy"></div>
            <footer-menu />
        </div>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';
import footerMenu from '../components/footerMenu.vue';

export default {
    name: "ConfigView",
    components: {
        supabaseFunction,
        footerMenu,
    },
    data() {
      return {
        flag: false,
      }
    },
    methods: {
      logOut(){
        this.$store.commit('setUserName', "");
        this.$router.push("/")
      },
      Delete(){
        this.flag=true;
      },
      backButton(){
        this.flag=false;
      },
      async accountDelete(){
        await this.$refs.childSupa.accountDelete(this.$store.state.username);
        this.$router.push("/")
      }
    }
}
</script>


<style scoped>
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

.router {
    border: none;
    color: #bdc3c7;
    text-decoration: none;
}

.delButon {
  background-color: #292929;
  width: 30%;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 1em;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 0.5em 4.5%;
  text-align: left;
}

.mainView {
  width: 100%;
  min-height: 100vh;
  background-color: #292929;
}

.hd {
  text-align: left;
}

#Name {
    margin: 0 1rem 0 1rem;
    font-size: 150%;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #292929;
  color: white;
}

.delete {
  margin: auto;
  text-align: center;
  width: 80%;
  height: 250px;
  color: black;
  background-color: white;
  position: sticky;
  bottom: 35%;
  font-size: 20px;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #292929;
  color: white;
  height: 100px;
}

.mainView h2{
  color:white;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  background-color: #292929;
}

button {
  background: transparent;
  width: 90%;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 1em;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 0.5em 4.5%;
  text-align: left;
}
button:hover {
  cursor:pointer;
  background: #18a5aa;
}

.info {
    color: rgb(173, 165, 165);
    text-align: left;
}

.dummy {
    height: 60px;
}
</style>
