<template>
        <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <a id="Name">{{ $store.state.username }}</a>
            </header>
            <main class="mainView">
              <br><br><br><h2>友だちリスト</h2>
              <br><input type="text" placeholder="検索" v-model="keyword" class="search">
              <label class="upload-label">画像を選択
                <input id="file" type="file" ref="urlGet" @change="imageChange">
                <img :src="dataUrl" />
              </label>
              <div class="friend" v-for="list in reverseItems" :key="list">
                <button class="profile" v-on:click="talkView(list.name)"><img src="https://vkmpvtwcwhsdgpslcbhm.supabase.co/storage/v1/object/public/calculator/profileImage/unknown.png" alt="" >
                {{ list.name }}
                </button>
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
    name: "MypageView",
    components: {
        supabaseFunction,
        footerMenu,
    },
    data (){
        return {
          friendList: this.$store.state.nameList.data,
          keyword: "",
          fileName: "",
          interval:"",
          dataUrl: "",
        }
    },
    methods: {
      async imageChange() {
        const input = this.$refs.urlGet.files[0];

        this.dataUrl = await this.$refs.childSupa.profileImageUpload(input);
        document.getElementById("file").value = '';
      },
      dataUpdate(){
        if(this.$route.path=='/mypage'){
          this.$refs.childSupa.nameList(this.$store.state.username);
          this.friendList=this.$store.state.nameList.data
        }else{
          clearInterval(this.interval);
        }
      },
      talkView(name){
        this.$store.commit('setFriName', name);
        this.$router.push("/mypage/friendProfile");
      }
    },
    mounted: function() {
        this.interval=setInterval(this.dataUpdate,500);
    },
    computed: {
      reverseItems() {
        const filteredTable = [];
        for (let i=0; i<this.friendList.length; i++){
          const filteredTables = this.friendList[i].name;
          if(filteredTables.indexOf(this.keyword) !== -1){
            filteredTable.push(this.friendList[i])
          }
        }
        return filteredTable.slice().reverse();
      }
    }
}
</script>

<style scoped>
.upload-label {
  display: inline-block;
  color: white;
}
.upload-label input {
  display: none;
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

.search {
  width: 90%;
  color: white;
  background-color: #3f3b3b;
  margin: 0.5rem 1.0rem 1.0rem 1.0rem;
}


.dummy {
    height: 60px;
}

img {
  width: 50px;
  height: 50px;
  margin: 0 30px;
  border-radius: 50%; 
}

.profile {
  width: 100%;
  text-align: left;
  background-color: #292929;
  color: white;
  font-size: 20px;
  border: solid 1px #292929;
  margin-top: 10px;
}
.profile:hover {
  background-color: #6d6d6d;
}

</style>
