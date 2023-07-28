<template>
  <header class="space">
    <supabase-function ref="childSupa" />
    <div class="calc">
        <input readonly v-model="result" type="text">
        <button id="c_btn" type="button" class="btn btn-primary rounded-pill" variant="outline-primary" v-on:click="c_click">C</button>
        <div v-for="row in dataArrays" :key="row">
          <button type="button" class="btn btn-primary rounded-pill" v-for="column in row" :key="column" v-on:click="btn_Click(column)">{{column}}</button>
        </div>
    </div>
    
  </header>
  
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue';

export default {
  name: 'Calc_Home',
  components: {
      supabaseFunction,
  },
  data (){
    return {
      counter: "0",
      result: "0",
      is_calc: false,
      dataArrays: [
        ["7", "8", "9", "÷"],
        ["4", "5", "6", "×"],
        ["1", "2", "3", "-"],
        ["0", ".", "=", "+"],
      ],
      operators_list: ["÷", "×", "-", "+"  ],
      password: "",
      secret: "",
    }
  },

  methods: {
    c_click: function () {
      this.counter++;
      this.result = "0";
      this.is_calc = false;

      if (this.counter == 5) {
        this.$router.push('/register');
      }
      
    },
    async btn_Click(val) {
      this.counter=0;

      this.password=this.password+val;
      if(this.$store.state.username != ""){
        this.secret=await this.$refs.childSupa.getSecretPW(this.$store.state.username);

        if(this.password.includes(this.secret)){
          this.$router.push('/mypage')
        }
      }

      if (this.operators_list.includes(val)) {
        this.ope_click(val);
      } else if (val === "=") {
        this.equal_click();
      } else {
        this.num_click(val);
      }
    },
    num_click: function (val) {
      if (this.is_calc) this.result = "0";
      this.is_calc = false;

      if (this.result == "0" && val == "0") {
        this.result = "0";
      } else if (this.result == "0" && val == ".") {
        this.result = "0.";
      } else if (this.result == "0") {
        this.result = val;
      } else {
        this.result += val;
      }
    },
    ope_click: function (val) {
      if (this.is_calc) this.is_calc = false;

      if (this.is_ope_last()) {
        this.result = this.result.slice(0, -1) + val;
      } else {
        this.result += val;
      }
    },
    equal_click: function () {
      if (this.is_ope_last()) this.result = this.result.slice(0, -1);

      var temp = new Function("return " + this.result.replaceAll("×", "*").replaceAll("÷", "/"))();
      if (temp == Infinity || Number.isNaN(temp)) {
        this.result = "Error";
      } else {
        this.result = temp;
        this.is_calc = true;
      }
    },
    is_ope_last: function () {
      return this.operators_list.includes(this.result.toString().slice(-1));
    },
  },
  async mounted(){
    if(this.$store.state.username!=""){
      this.result=await this.$refs.childSupa.unreadMessage(this.$store.state.username);
    }
  }
}

</script>

<style scoped>
.space {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
input {
    box-sizing: border-box;
    width: 100%;
    height: 6.5rem;
    font-size: 2.5rem;
    text-align: right;
    padding: 0 0.75rem;
    margin-bottom: 10px;
}
button {
    font-size: 18px;
    width: 25%;
    height: 5em;
    color:  #fff;
    vertical-align: middle;
    border-color: #fff;
    margin: 2% 0  ;
    border-radius:50px;
    border: none;
}
#c_btn {
    font-size: 18px;
    width: 50%;
    height: 5.5rem;
    color:  #fff;
    border-color: #fff;
    display: block;
    margin: 0 0 0 auto;
}
.btn-primary {
    background: #252525;
}
.calc {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: 0 0 10% 0;
}


.btn-primary:hover {
  background-color: #18a5aa;
  border-color: #18a5aa;
}
</style>
