<template>
<transition appear>
    <div>
            <supabase-function ref="childSupa" />
            <header class="hd">
              <div class="backBtn"><router-link to="/talkList" class="router">＜</router-link>{{this.result}}</div>
              <a id="Name">{{ $store.state.friendname }}</a>
            </header>
            <main class="mainView">
                <!-- ▼会話エリア scrollを外すと高さ固定解除 -->
                <div class="contents" id="scroll">
                    <div v-for="(list, index) in talkItems" :key="list" v-bind:class="[index == talkItems.length-1 ? 'finish' : 'scroll_inner']">
                        <div class="hiduke" v-if="list.firstMessage=='true'"><p>{{ list.time.substr( 0, 10).replace(/-/g, '/') }}</p></div>

                        <!-- 相手の吹き出し -->
                        <div class="line_left" v-if="list.sender!=this.$store.state.username">
                            <a>{{ list.message }}</a>
                            <div class="time-box">
                                <span class="time">{{ list.time.substr( 11, 5) }}</span>
                            </div>
                        </div>

                        <!-- 自分の吹き出し -->
                        <div class="line_right" v-else>
                            <a>{{ list.message }}</a>
                            <div class="time-box">
                                <span class="read" v-if="list.read=='true'">既読</span>
                                <span class="time">{{ list.time.substr( 11, 5) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer><input type="text" v-model="message" placeholder="メッセージを入力">
                <button class="round_arrow" v-on:click="messageInput">＞</button>
            </footer>
        </div>
</transition>
</template>

<script>

import supabaseFunction from '../components/supabaseFunction.vue';
import { supabase } from '../supabase'

export default {
    name: "MessageView",
    components: {
        supabaseFunction,
    },
    data() {
        return {
            talkItems: [],
            message: "",
            nowDate: "",
            channel:[], 
            roomID: "",
            result: "",
        }
    },
    methods: {
        async messageInput(){
            if(this.message!=""){
                const date = new Date();
                this.nowDate=date.toLocaleString();
                await this.$refs.childSupa.msgInput(this.$store.state.username, this.message, this.nowDate);
                this.message="";
                setTimeout(async () => {
                    await this.pagebottom(); 
                },500)
            }
        },
        pagebottom(){
            const list = document.getElementById('scroll');
            list.scrollTo(0, list.scrollHeight);
        },
        async getMessage(){
            const getRoomID=await supabase.from("Friend")
            .select("*")
            .eq("loginName", this.$store.state.username)
            .eq("name", this.$store.state.friendname)

            this.roomID=getRoomID.data[0].chatRoomNumber;

            let test=await supabase.from("TalkTable")
            .select("*")
            .eq("chatRoomNumber", getRoomID.data[0].chatRoomNumber)
            .order('time', { ascending: true })

            this.talkItems=test.data
        },
        async subscribeMessage(){
                this.channel = supabase
                            .channel("table-db-changes")
                            .on(
                                "postgres_changes",
                                {
                                event: "*",
                                schema: "public",
                                table: "TalkTable",
                                },
                                (payload) => {
                                    if(payload.eventType=="UPDATE"){
                                        let test = this.talkItems.map((obj) => {
                                            return obj.id;
                                        });
                                        let index=test.indexOf(payload.new.id);
                                        this.talkItems[index]=payload.new;
                                    }else if(payload.eventType=="INSERT"){
                                        this.talkItems.push(payload.new);
                                        this.messageTimeInput(payload.new.time);
                                    }
                                }
                            )
                            .subscribe();
                this.interval=setInterval(this.dataUpdate,300);
                
        },
        unsubscribeMessage(){
            supabase.removeChannel(this.channel);
        },
        async dataUpdate(){
            if(this.$route.path=='/talkList/message'){
                await this.$refs.childSupa.readUpdate(this.$store.state.friendname, this.roomID);
            }else{
                clearInterval(this.interval);
            }
        },
        messageTimeInput(time){
            this.$refs.childSupa.lastMessageTimeInput(this.$store.state.username, this.$store.state.friendname, time);
        },
        async unreadMessage(){
            const tmp= await this.$refs.childSupa.unreadMessage(this.$store.state.username);
            if(tmp!=0){
                this.result=tmp;
            }
        }
    },
    async mounted(){
        this.getMessage();
        this.subscribeMessage();
        this.unreadMessage();
        setTimeout(async () => {
            await this.pagebottom(); 
        },180)
    },
    beforeUnmount(){
        this.unsubscribeMessage();
    }
    
}
</script>

<style scoped>
.v-enter-to {
  transition: transform 0.8s ease-out;
  transform: translateX(0px);
}
.v-enter-from {
  transform: translateX(-500px);
}
input {
    padding:10px 15px;
    border-radius:10px;
    color:black;
    border: none;
    width: 70%;
    margin-bottom: 5px;
    font-size: 16px
}

.contents {
  padding-bottom: 70px;
  width: 100%;
}

 #scroll {
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

#scroll::-webkit-scrollbar{
  display: none;
}



.finish {
    margin-bottom: 5px;
}

.line_left{
    display:flex;
    box-pack:start;
    -webkit-box-pack:start;
    overflow: hidden;
    margin:0 8px 16px 8px;
}    
.line_left a {
    position:relative;
    max-width:80%;
    background:#999999;
    padding:8px;
    margin:0 8px 0 8px;
    border:solid 1px rgb(150,150,150);
    border-radius:8px;
}
.time-box{
    display:flex;
    -webkit-align-items:flex-end;
    align-items:flex-end;
    color: white;
    font-size: 14px;

}
.line_right{
    display:flex;
    flex-direction:row-reverse;
    box-pack:end;
    -webkit-box-pack:end;
    overflow: hidden;
    margin:0 8px 16px 8px;
}     
    
.line_right a {
    position:relative;
    max-width:80%;
    background:#94d7da;
    margin:0 0 0 8px;
    padding:8px;
    border:solid 1px rgb(150,150,150);
    border-radius:8px;
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
  height: 100vh;
  background-color: #292929;
}

header {
  position: sticky;
  display: flex;
  top: 0;
  width: 100%;
  background-color: #292929;
  color: white;
  height: 50px;
  font-size: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #afadad;
  z-index: 1; 
}
#Name {
    margin: auto;
}
.backBtn {
    text-align: left;
}
.router {
    border: none;
    color: white;
    text-decoration: none;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #292929;
  color: white;
  text-align: center;
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

.round_arrow {
  position: relative;
  margin: auto;
  width: 40px; /* 横幅 */
  height: 40px; /* 高さ */
  border-radius: 50%; /* 角の丸み */
  background: #4682b4;
  color: white;
  border: none;
}

.hiduke{
    text-align: center;
    width: 100%;
    position: sticky;
    top: 0;
}
.hiduke p {
    border: 1px solid #7e7e7e;
    font-size: 11px;
    color: white;
    width: 80px;
    margin:auto;
    margin-bottom: 5px;
    border-radius: 10px;
}
</style>
