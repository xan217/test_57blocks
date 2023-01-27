<style src="./footer.css"></style>
<template src="./footer.html"></template>

<script>

export default {
  name: 'FooterComponent',
  components: {
  
  },
  data: () => ({
    authenticated: false
  }),
  watch: {
    '$route' (to) {
      this.authenticated = to.fullPath !== '/login';
    }
  }
}
</script>
