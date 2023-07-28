<template>
    <div></div>
</template>


<script>
import { supabase } from '../supabase'

export default {
  data() {
    return {
        nameError: "",
        emailError: "",
        passwordError: "",
        passwordConfirmError: "",
        nowPasswordError: "",
        flag: true,
        nameData: "",
        cnt: "",
        domain: [
            "@yahoo.co.jp",
            "@gmail.com",
            "@ezweb.ne.jp",
            "@au.com",
            "@docomo.ne.jp",
            "@i.softbank.jp",
            "@softbank.ne.jp",
            "@excite.co.jp",
            "@googlemail.com",
            "@hotmail.co.jp",
            "@hotmail.com",
            "@icloud.com",
            "@live.jp",
            "@me.com",
            "@mineo.jp",
            "@nifty.com",
            "@outlook.com",
            "@outlook.jp",
            "@yahoo.ne.jp",
            "@ybb.ne.jp",
            "@ymobile.ne.jp"
        ]
    }
  },
  methods: {
    async sendUserInfo(username, email, password) {
        await supabase.from("UserInfo").insert({
            name: username,
            mail: email,
            password: password,
        });
    },

    async sendSecretPassword(password) {
        let userName=this.$store.state.username
        await supabase.from("UserInfo")
            .update({secret: password})
            .eq("name", userName);
    },

    async errorCheck(username, email, password, passwordConfirm) {
        this.nameError=await this.nameCheck(username);
        this.emailError=await this.emailCheck(email);
        this.passwordError=await this.passwordCheck(password);
        this.passwordConfirmError= await this.passwordConfirmCheck(password,passwordConfirm);

        if (this.nameError=="" && this.emailError=="" && this.passwordError=="" && this.passwordConfirmError==""){
            this.flag=true;
        }else{
            this.flag=false;
        }

        return {
            nameError: this.nameError,
            emailError: this.emailError,
            passwordError: this.passwordError,
            passwordConfirmError: this.passwordConfirmError,
            flag: this.flag
        }
    },

    async errorSecretCheck(password, passwordConfirm) {
        this.passwordError=await this.secretPasswordCheck(password);
        this.passwordConfirmError=await this.passwordConfirmCheck(password,passwordConfirm);

        if (this.passwordError=="" && this.passwordConfirmError==""){
            this.flag=true;
        }else{
            this.flag=false;
        }

        return {
            passwordError: this.passwordError,
            passwordConfirmError: this.passwordConfirmError,
            flag: this.flag
        }
    },

    async nameCheck(username) {
        if(username==""){
            return "未入力です"
        }else{
            const nameData = await supabase.from("UserInfo").select("name");
            for (let i=0; i<nameData.data.length; i++) {
                if(username == nameData.data[i].name){
                    return "このニックネームは使われています。"
                }
            }
            return ""
        }
    },

    async emailCheck(email) {
        if(email==""){
            return "未入力です"
        }else{
            const mailData = await supabase.from("UserInfo").select("mail");
            for (let i=0; i<mailData.data.length; i++) {
                if(email == mailData.data[i].mail){
                    return "このメールアドレスは使われています。"
                }
            }
            
            for (let i=0; i<this.domain.length; i++) {
                if(email.indexOf(this.domain[i])>0){
                    return ""
                }
            }
            return "正しいメールアドレスを入力してください。もしくは使用できないドメインです。"
        }
    },

    passwordCheck: function(password){
        if(password==""){
            return "未入力です"
        }else{
            if(password.length<8){
                return "8文字未満です"
            }else{
                return ""
            }
        }
    },

    passwordConfirmCheck: function(password,passwordConfirm) {
        if(passwordConfirm==""){
            return "未入力です"
        }else{
            if(password!=passwordConfirm){
                return "パスワードが一致しません"
            }else{
                return ""
            }
        }
    },

    secretPasswordCheck: function(secretPassword){
        if(secretPassword==""){
            return "未入力です"
        }else{
            if(secretPassword.length<4){
                return "4文字未満です"
            }else{
                for (let i=0; i<secretPassword.length; i++) {
                    if(secretPassword[i].match( /^[0-9*+-/]+$/g )==null){
                        return "電卓で使用できない文字が入っています"
                    }
                }
                return ""
                
            }
        }
    },

    async errorSecretPasswordChangeCheck(nowPassword, newPassword, newPasswordConfirm){
        const username=this.$store.state.username;
        const result=await supabase.from("UserInfo")
                            .select("*")
                            .eq("name", username)

        if(result.data[0].secret!=nowPassword){
            this.nowPasswordError="現在のパスワードが違います"
        }else{
            this.nowPasswordError=""
        }

        this.passwordError=await this.secretPasswordCheck(newPassword);
        this.passwordConfirmError=await this.passwordConfirmCheck(newPassword,newPasswordConfirm);

        if (this.passwordError=="" && this.passwordConfirmError=="" && this.nowPasswordError==""){
            this.flag=true;
        }else{
            this.flag=false;
        }

        return {
            nowPasswordError: this.nowPasswordError,
            newPasswordError: this.passwordError,
            newPasswordConfirmError: this.passwordConfirmError,
            flag: this.flag
        }
    },

    async errorPasswordChangeCheck(nowPassword, newPassword, newPasswordConfirm){
        const username=this.$store.state.username;
        const result=await supabase.from("UserInfo")
                            .select("*")
                            .eq("name", username)

        if(result.data[0].password!=nowPassword){
            this.nowPasswordError="現在のパスワードが違います"
        }else{
            this.nowPasswordError=""
        }

        this.passwordError=await this.passwordCheck(newPassword);
        this.passwordConfirmError=await this.passwordConfirmCheck(newPassword,newPasswordConfirm);

        if (this.passwordError=="" && this.passwordConfirmError=="" && this.nowPasswordError==""){
            this.flag=true;
        }else{
            this.flag=false;
        }

        return {
            nowPasswordError: this.nowPasswordError,
            newPasswordError: this.passwordError,
            newPasswordConfirmError: this.passwordConfirmError,
            flag: this.flag
        }
    },

    async changePassword(username, newPassword){
        await supabase.from("UserInfo")
                .update({password: newPassword})
                .eq("name", username);
    },

    async loginCheck(loginUser, loginPassword){
        const login = await supabase.from("UserInfo")
            .select("*")
            .eq("name", loginUser);

        
        await this.nameList(loginUser);
        await this.talkList(loginUser);
        await this.pendingUserList(loginUser);
        await this.applyingUserList(loginUser);


        if(login.data.length==0) {
            this.nameError="存在しないユーザです"
            this.passwordError=""
            this.flag=false;
        }else if(login.data[0].password==loginPassword){
            this.nameError=""
            this.passwordError=""
            this.flag=true;
        }else{
            this.nameError=""
            this.passwordError="パスワードが間違っています"
            this.flag=false;
        }
        
        return {
            nameError: this.nameError,
            passwordError: this.passwordError,
            flag: this.flag
        }
    },

    async userSearch(username,keyword){
        const user= await supabase.from("UserInfo")
            .select("name")
            .eq("name", keyword);
        this.flag=false;
        let userResult=[];

        if(user.data.length==1){
            this.flag=true;
            userResult= await supabase.from("Friend")
                .select("name,loginName,state")
                .eq("name", keyword)
                .eq("loginName", username);
        }

        return {
            userResult: userResult,
            flag: this.flag,
        }
    },

    async getSecretPW(username){
        const result=await supabase.from("UserInfo")
                .select("secret")
                .eq("name", username)
        return result.data[0].secret
    },

    async giveNumber(loginUser, friendName){
        const result=await supabase.from("Friend")
            .select("*")
            .eq("loginName", loginUser)
            .eq("name", friendName);

        if(result.data[0].chatRoomNumber==0){
            const chatRoomNumber=await supabase.from("Friend")
                .select('*')
                .order('chatRoomNumber', { ascending: false })

            let give=chatRoomNumber.data[0].chatRoomNumber+1

            this.$store.commit('setFriName', friendName);

            await supabase.from("Friend")
            .update({chatRoomNumber: give})
            .eq("loginName", loginUser)
            .eq("name", friendName);

            await supabase.from("Friend")
            .update({chatRoomNumber: give})
            .eq("loginName", friendName)
            .eq("name", loginUser);
        }
    },

    async nameList(loginUser){
        const nameList = await supabase.from("Friend")
            .select('*').eq("loginName", loginUser).eq("state", "approved").order('name', { ascending: false })
        this.$store.commit('setNameList', nameList);
    },

    async talkList(loginUser){
        const talkList = await supabase.from("Friend")
            .select('*').eq("loginName", loginUser).gt("chatRoomNumber", 0).order('lastMessageTime', { ascending: true })

        for(let i=0; i<talkList.data.length; i++){
            let array=await supabase.from("TalkTable")
                .select("*")
                .eq("chatRoomNumber", talkList.data[i].chatRoomNumber)
                .order('time', { ascending: false });

            talkList.data[i].lastMessage=array.data[0].message;

            let message=await supabase.from("TalkTable")
                .select("*", { count: 'exact', head: true })
                .eq("chatRoomNumber", talkList.data[i].chatRoomNumber)
                .eq("sender", talkList.data[i].name)
                .eq("read", "false");

            talkList.data[i].unreadCount=message.count;
        }
        this.$store.commit('setTalkList', talkList);
    },

    async pendingUserList(keyword){
        const userResult=await supabase.from("Friend")
            .select('*')
            .eq("loginName", keyword)
            .eq("state", "approval pending")
        this.$store.commit('setPendingUser', userResult);
    },

    async applyingUserList(keyword){
        const userResult=await supabase.from("Friend")
            .select('*')
            .eq("loginName", keyword)
            .eq("state", "applying")
        this.$store.commit('setApplyingUser', userResult);
    },

    async UserAdd(username, friendName) {
        await supabase.from("Friend").insert({
            name: username,
            loginName: friendName,
            state: "approval pending",
        });

        await supabase.from("Friend").insert({
            name: friendName,
            loginName: username,
            state: "applying",
        });

        
    },

    async UserDelete(username, friendName) {
        await supabase.from("Friend")
        .delete()
        .eq("loginName", username)
        .eq("name", friendName);

        await supabase.from("Friend")
        .delete()
        .eq("loginName", friendName)
        .eq("name", username);

    },

    async friendGet(username, friendName) {
        await supabase.from("Friend")
        .update({state: "approved"})
        .eq("loginName", username)
        .eq("name", friendName);

        await supabase.from("Friend")
        .update({state: "approved"})
        .eq("loginName", friendName)
        .eq("name", username);

        const nameList = await supabase.from("Friend")
            .select('name,loginName').eq("loginName", username).eq("state", "approved")

        this.$store.commit('setNameList', nameList);
    },

    async msgInput(username, message, date){
        const roomID=await supabase.from("Friend")
            .select("chatRoomNumber")
            .eq("loginName", username)
            .eq("name", this.$store.state.friendname);

        const today=new Date().toLocaleDateString('sv-SE');
        const flag=await supabase.from("TalkTable")
            .select("*")
            .eq('chatRoomNumber', roomID.data[0].chatRoomNumber)
            .gte('time', today+" 00:00:00")
            .lte('time', today+" 23:59:59")

        if(flag.data.length>0){
            await supabase.from("TalkTable").insert({
                chatRoomNumber: roomID.data[0].chatRoomNumber,
                sender: username,
                message: message,
                time: date,
            });
        }else{
            await supabase.from("TalkTable").insert({
                chatRoomNumber: roomID.data[0].chatRoomNumber,
                sender: username,
                message: message,
                time: date,
                firstMessage: "true",
            });
        }
    },

    async readUpdate(friendName, roomID){
        await supabase.from("TalkTable")
            .update({read: "true"})
            .eq("chatRoomNumber", roomID)
            .eq("sender", friendName)
            .eq("read", "false");
    },

    async lastMessageTimeInput(username, friendName, lastTime){
        await supabase.from("Friend")
            .update({lastMessageTime: lastTime})
            .eq("name", friendName)
            .eq("loginName", username);

        await supabase.from("Friend")
            .update({lastMessageTime: lastTime})
            .eq("name", username)
            .eq("loginName", friendName);
    },

    async unreadMessage(username){
        this.cnt=0;
        const count=await supabase.from("Friend")
                .select("chatRoomNumber")
                .eq("loginName", username);

        let array=[];
        for(let i=0; i<count.data.length; i++){
            array.push(count.data[i].chatRoomNumber)
        }

        for(let i=0; i<array.length; i++){
            let message=await supabase.from("TalkTable")
                .select("*", { count: 'exact', head: true })
                .eq("chatRoomNumber", array[i])
                .neq("sender", username)
                .eq("read", "false");

            this.cnt=this.cnt+message.count;
        }

        return this.cnt
    },

    async deleteFriend(username, friendname){
        const chatRoomNumber= await supabase.from("Friend")
                    .select("*")
                    .eq("loginName", username)
                    .eq("name", friendname);

        await supabase.from("Friend")
        .delete()
        .eq("loginName", username)
        .eq("name", friendname);

        await supabase.from("Friend")
        .delete()
        .eq("loginName", friendname)
        .eq("name", username);

        await supabase.from("TalkTable")
        .delete()
        .eq("chatRoomNumber", chatRoomNumber.data[0].chatRoomNumber);
    },

    async accountDelete(username) {
        await supabase.from("Friend")
            .update({loginName: "unknown"})
            .eq("loginName", username);
            
            
        await supabase.from("Friend")
            .update({name: "unknown"})
            .eq("name", username);

        await supabase.from("TalkTable")
            .update({sender: "unknown"})
            .eq("sender", username);

        await supabase.from("UserInfo")
        .delete()
        .eq("name", username);
    },

    /*
    async profileImageUpload(url){
        const {data, error} = await supabase.storage.from("public/calculator")
            .upload("logo.png", url);

        if(data){
            console.log(data)
        }else{
            console.log(error)
        }

        const  publicURL  = await supabase.storage
            .from("calculator")
            .getPublicUrl("profileImage/logo.png");
        console.log(publicURL.data.publicUrl)
    
        return publicURL.data.publicUrl
    }*/
  }
}
</script>
