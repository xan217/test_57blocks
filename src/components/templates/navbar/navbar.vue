<style src="./navbar.css"></style>
<template src="./navbar.html"></template>

<script>

export default {
  name: 'NavbarComponent',
  components: {},
  data: () => ({
    showMenu: false
  }),
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
