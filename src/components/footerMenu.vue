<template>
  <footer class="border-top">
    
  <div id="fixed-footer-menu">
    <ul>
      <li><router-link to="/mypage"><i class="fa-solid fas fa-house-user footer-icon"></i><br>
          <p>ホーム</p>
        </router-link></li>
      <li><router-link to="/talkList"><i class="fa-solid fas fa-comment footer-icon"></i><br>
          <p>トーク</p>
        </router-link></li>
      <li><router-link to="/friendAdd"><i class="fa-solid fas fas fa-user-plus footer-icon"></i><br>
          <p>追加</p>
        </router-link></li>
      <li><router-link to="/config"><i class="fa-solid fas fa-cog footer-icon"></i><br>
          <p>設定</p>
        </router-link></li>
      
    </ul>
  </div>
  </footer>
</template>

<script>

export default {
  name: "footerMenu",
  /*far fa-comment*/
  /*fas fa-house-user*/
}
</script>

<style scoped>
#fixed-footer-menu {
  position: fixed;
  width: 100%;
  bottom: 0px;
  opacity: 1;
  z-index: 100;
}

#fixed-footer-menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #292929;
}

#fixed-footer-menu li {
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0;
  margin: 0 5% 0 5%;
  color: white;
}

#fixed-footer-menu li a {
  color: white;
  text-align: center;
  display: block;
  width: 100%;
  padding: 10px 0px 0px 0px;
  font-size: 8px;
  text-decoration: none;
}

#fixed-footer-menu li p {
  font-size: 8px;
}

.footer-icon {
  font-size: 20px;
}

</style>