<style src="./home.css"></style>
<template src="./home.html"></template>

<script>
import MovieCardComponent from '@/components/common/movie-card/movie-card.vue';
import MovieCardExtendedComponent from '@/components/common/movie-card-extended/movie-card-extended.vue';
import * as Data from '@/assets/mockData.json';

import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

export default {
  name: 'HomePage',
  components: {
    MovieCardComponent,
    MovieCardExtendedComponent,
    Carousel,
    Slide
  },
  data: () => ({
    favorites: null,
    trend: null,
    country: null,
  }),
  mounted() {
    this.favorites = Data.results;
    this.trend = Data.results;
    this.country = Data.results;
  }

}
</script>
