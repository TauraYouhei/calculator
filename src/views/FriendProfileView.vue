<template>
        <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <a id="Name">{{ $store.state.username }}</a>
            </header>
            <main class="mainView">
              <br><br><br><h2>プロフィール</h2>
              <br>
              <div class="back">
                <router-link to="/mypage"><button class="backButton">×</button></router-link>
              </div>
              <div class="flex">
                <img src="../assets/unknown.png" alt="" >
                <p>{{$store.state.friendname}}</p>
                <button class="talknextButton" v-on:click="chatRoomNumber">トーク</button>
                <button class="deleteButton" v-on:click="deleteFriend">削除</button>

                <div class="delete" v-show="this.flag"><br><br>自分及び相手側からも消えてしまいます。<br>本当に削除しますか？<br>
                <button class="delButon" v-on:click="Delete">削除</button>
                <button class="backButon" v-on:click="backButton">戻る</button></div>


              </div>
            </main>
            <div class="dummy"></div>
            <footer-menu />
        </div>      
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';
import footerMenu from '../components/footerMenu.vue';

export default {
    name: "FriendProfileView",
    components: {
        supabaseFunction,
        footerMenu,
    },
    data (){
        return {
          flag: false,
        }
    },
    methods: {
      chatRoomNumber() {
        this.$refs.childSupa.giveNumber(this.$store.state.username, this.$store.state.friendname);
        this.$router.push("/talkList/message");
      },
      deleteFriend() {
        this.flag=true;
      },
      Delete() {
        this.$refs.childSupa.deleteFriend(this.$store.state.username, this.$store.state.friendname);
        this.$router.push("/mypage");
      },
      backButton() {
        this.flag=false;
      }

    },
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

.mainView {
  width: 100%;
  min-height: 100vh;
  background-color: #292929;
  text-align: center;
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
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  background-color: #292929;
}
.mainView p{
  color:white;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  background-color: #292929;
}
.back {
  width: 100%;
  position: fixed;
  text-align: left;
}
.backButton {
  border: none;
  background: transparent;
  color: white;
  font-size: 25px;
  margin-left: 1%;
}
.dummy {
    height: 60px;
}
.flex {
    position: fixed;
    bottom: 30%;
    text-align: center;
    width: 100%;
}
img {
  max-height: 305px;
  max-width: 305px;
  width: 40%;
  height: 20%;
  border-radius: 50%;
  margin: 0 auto 0 auto;
}

.talknextButton, .deleteButton {
  width: 82px;
  background: transparent;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 1em;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 0.5em 0;
}
.talknextButton:hover, .backButon:hover {
  cursor:pointer;
  background: #18a5aa;
}

.deleteButton:hover, .delButon:hover {
  cursor:pointer;
  background: #ee4d38;
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

.delButon, .backButon {
  background-color: #292929;
  width: 30%;
  font-size: 1rem;
  border: solid 1px #18a5aa;
  padding: 1em 1em;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 0.5em 4.5%;
  text-align: center;
}

</style>
