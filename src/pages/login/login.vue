<style src="./login.css"></style>
<template src="./login.html"></template>

<script>
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
    saveInfo() { 
      if(this.username.length && this.password.length) {
        localStorage.setItem('userInfo', `{username:${this.username},password:${btoa(this.password)}}`);
      this.$router.push('/home');
      }
    }
  }
}
</script>
