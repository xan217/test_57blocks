<style src="./login.css"></style>
<template src="./login.html"></template>

<script>
import { UserServices } from '@/services/user.service';

export default {
  name: 'LoginPage',
  components: {
  
  },
  data: () => ({
    username: '',
    password: ''
  }),
  mounted() {
    if(localStorage.getItem('userInfo')) {
      this.$router.push('/home');
    }
  },
  methods: {
    async saveInfo() { 
      if(this.username.length && this.password.length) {
        localStorage.setItem('userInfo', `{username:${this.username},password:${btoa(this.password)}}`);
        if( await UserServices.authenticate() )
          await UserServices.authorizeToken();
      }
    }
  }
}
</script>
