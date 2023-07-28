<template>
        <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <a id="Name">{{ $store.state.username }}</a>
            </header>
            <main class="mainView">
              <br><br><br><h2>トークリスト</h2>
              <br><input type="text" placeholder="検索" v-model="keyword" class="search">
              <div class="friend" v-for="list in reverseItems" :key="list">
                <button class="profile" v-on:click="talkView(list.name)">
                  <div class="img"><img src="../assets/unknown.png" alt="" ></div>
                  <div class="name">{{ list.name }}</div>
                  <div class="message" v-if="list.lastMessage.length>10"><p>{{ list.lastMessage.substr(0, 10)+"..." }}</p></div>
                  <div class="message" v-else><p>{{ list.lastMessage }}</p></div>
                  <div class="time" v-if="list.lastMessageTime.substr( 5, 5).replace(/-/g, '/')==this.today.substr( 5, 5)">{{ list.lastMessageTime.substr( 11, 5) }}</div>
                  <div class="time" v-else-if="list.lastMessageTime.substr( 5, 5).replace(/-/g, '/')==this.yesterday.substr( 5, 5)">昨日</div>
                  <div class="time" v-else>{{ list.lastMessageTime.substr( 5, 5).replace(/-/g, '/') }}</div>
                  <div class="unread" v-show="list.unreadCount>0">{{ list.unreadCount }}</div>
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
    name: "TalkListView",
    components: {
        supabaseFunction,
        footerMenu,
    },
    data (){
        return {
          friendList: this.$store.state.talkList.data,
          keyword: "",
          fileName: "",
          interval: "",
          yesterday: "",
          today:"",
        }
    },
    methods: {
        async talkView(name){
            await this.$store.commit('setFriName', name);
            this.$router.push("/talkList/message");
        },
        dataUpdate(){
          if(this.$route.path=='/talkList'){
            this.$refs.childSupa.talkList(this.$store.state.username);
            this.friendList=this.$store.state.talkList.data
          }else{
            clearInterval(this.interval);
          }
        },
        dateSet(){
          var date = new Date();
          this.today=date.toLocaleString('ja-JP', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          date.setDate(date.getDate() - 1);
          this.yesterday=date.toLocaleString('ja-JP', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
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
    },
    mounted: function() {
        this.interval=setInterval(this.dataUpdate,500);
        this.dateSet();
    },
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
  width: 60px;
  height: 60px;
  margin: 0 30px;
  border-radius: 50%; 
}

.profile {
  width: 90%;
  text-align: left;
  background-color: #292929;
  color: white;
  font-size: 20px;
  border: solid 1px #292929;
  margin-top: 10px;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "img name name time"
    "img message message unread";
}
.img {
    grid-area: img;
    text-align: center;
    margin: auto 0;
}
.name {
    grid-area: name;
    margin-top: auto;
}
.message {
    grid-area: message;
}
.time {
    grid-area: time;
    text-align: right;
    margin: auto 0;
    font-size:13px;
    color: #867b7b;
}
.unread {
    grid-area: unread;
    text-align: center;
    border-radius: 50%;
    width: 30px;
    background-color: rgb(75, 218, 170);
    margin-left: auto;
}

.profile:hover {
  background-color: #6d6d6d;
}
.profile p {
  font-size:14px;
  color: #867b7b;
}


</style>
