<style src="./navbar.css"></style>
<template src="./navbar.html"></template>

<script>

export default {
  name: 'NavbarComponent',
  components: {},
  data: () => ({
    showMenu: false,
    authenticated: false
  }),
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() { 
      localStorage.removeItem('userInfo');
      this.$router.replace('/login');
    }
  },
  watch: {
    '$route' () {
      this.authenticated = !!localStorage.getItem('userInfo');
      this.showMenu = false;
    }
  }
}
</script>
