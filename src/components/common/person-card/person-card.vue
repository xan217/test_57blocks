<style src="./person-card.css"></style>
<template src="./person-card.html"></template>

<script>
export default {
  name: 'PersonCardComponent',
  props: [
    'person'
  ],
  data: () => ({
    background: ''
  }),
  mounted() {
    this.background = this.person.profile_path ? `url(https://image.tmdb.org/t/p/original${this.person.profile_path})` : '';
  },
}
</script>
