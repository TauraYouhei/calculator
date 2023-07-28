<template>
        <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <a id="Name">{{ $store.state.username }}</a>
            </header>
            <main class="mainView">
              <br><br><br><h2 class="Add">友だち検索</h2>
              <br>
                <input type="text" placeholder="ユーザ名で検索" v-model="keyword" class="search">
                <button class="searchButton" v-on:click="friendSearch">検索</button>
                <div class="searchResult" v-if="this.flag">
                    <button class="profile" >
                        <img src="https://vkmpvtwcwhsdgpslcbhm.supabase.co/storage/v1/object/public/calculator/profileImage/unknown.png" alt="" >
                        {{ userName }}
                        <button class="AddButton" v-on:click="UserAdd">追加申請</button>
                    </button>
                </div>
                <div class="searchResult" v-if="!this.flag"><p>{{this.flagText}}</p></div>

              <h2 class="Add" v-if="this.pendingUser.data.length!=0">承認待ちユーザ</h2>
              <div class="friend"><div v-for="list in this.pendingUser.data" :key="list">
                <button class="profile"><img src="https://vkmpvtwcwhsdgpslcbhm.supabase.co/storage/v1/object/public/calculator/profileImage/unknown.png" alt="" >
                    {{ list.name }}
                    <button class="AddButton" v-on:click="friendGet(list.name)">○</button><button class="AddButton" v-on:click="UserDelete(list.name)">×</button>
                </button>
              </div></div>

              <h2 class="Add" v-if="this.applyingUser.data.length!=0">申請中ユーザ</h2>
              <div class="friend"><div v-for="list in this.applyingUser.data" :key="list">
                <button class="profile"><img src="https://vkmpvtwcwhsdgpslcbhm.supabase.co/storage/v1/object/public/calculator/profileImage/unknown.png" alt="" >
                {{ list.name }}
                </button>
              </div></div>
            </main>
            <div class="dummy"></div>
            <footer-menu />
        </div>      
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';
import footerMenu from '../components/footerMenu.vue';
export default {
    name: "FriendAddView",
    components: {
        supabaseFunction,
        footerMenu,
    },
    data (){
        return {
            keyword: "",
            userName: "",
            result: [],
            flag: false,
            flagText: "",
            pendingUser: this.$store.state.pendingUser,
            applyingUser: this.$store.state.applyingUser,
            interval: ""
        }
    },
    
    methods: {
        async friendSearch(){
            this.result=await this.$refs.childSupa.userSearch(this.$store.state.username,this.keyword);

            if(this.result.flag==true){
              if(this.result.userResult.data.length>0){
                if(this.result.userResult.data[0].state=="approved"){
                    this.flag=false;
                    this.flagText="既に友達です。"
                }else if(this.result.userResult.data[0].state=="applying"){
                    this.flag=false;
                    this.flagText="申請済みです。"
                }else if(this.result.userResult.data[0].state=="approval pending"){
                    this.flag=false;
                    this.flagText="あなたの承認を待ってるユーザです。"
                }
              }else{
                this.flag=true;
                this.userName=this.keyword;
              }
            }else{
                this.flag=false;
                this.flagText="該当のユーザは存在しません。"
            }
        },

        async UserAdd(){
            await this.$refs.childSupa.UserAdd(this.$store.state.username, this.userName);
            this.userName="";
            this.flagText="";
            this.flag=false;
        },

        async UserDelete(name){
            await this.$refs.childSupa.UserDelete(this.$store.state.username, name);
        },

        async friendGet(name){
            await this.$refs.childSupa.friendGet(this.$store.state.username, name);
        },
        dataUpdate(){
          if(this.$route.path=='/friendAdd'){
            this.$refs.childSupa.pendingUserList(this.$store.state.username);
            this.$refs.childSupa.applyingUserList(this.$store.state.username);
            this.pendingUser=this.$store.state.pendingUser;
            this.applyingUser=this.$store.state.applyingUser;
          }else{
            clearInterval(this.interval);
          }
        },
    
    },
    mounted: function() {
        this.interval=setInterval(this.dataUpdate,500);
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
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #292929;
}

.Add{
    position: sticky;
    top: 75px;
}

.dummy {
    height: 60px;
}

.search {
  width: 70%;
  color: white;
  background-color: #3f3b3b;
  margin: 0 0 1.0rem 1.0rem;
}

.searchButton {
  background: transparent;
  border: solid 1px #18a5aa;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
  margin: 0 0 0 10px;
}
.searchButton:hover {
  cursor:pointer;
  background: #18a5aa;
}


.AddButton {
  background: transparent;
  border: solid 1px #18a5aa;
  color: #bdc3c7;
  transition: all 0.6s;
  display: inline-block;
}
.AddButton:hover {
  cursor:pointer;
  background: #18a5aa;
}

.searchResult{
    color: white;
    text-align: left;
    margin-bottom: 40px;
}

.searchResult p {
    text-align: center;
}

img {
  width: 50px;
  height: 50px;
  margin: 1.0rem 2.5rem;
  border-radius: 50%; 
}

.profile {
    width: 100%;
    text-align: left;
    background-color: #292929;
    border: none;
    color: white;
    font-size: 20px;
}

</style>
