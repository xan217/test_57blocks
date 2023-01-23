<style src="./home.css"></style>
<template src="./home.html"></template>

<script>
import MovieCardComponent from '@/components/common/movie-card/movie-card.vue';
import MovieCardExtendedComponent from '@/components/common/movie-card-extended/movie-card-extended.vue';
import * as Data from '@/assets/mockData.json';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'HomePage',
  components: {
    MovieCardComponent,
    MovieCardExtendedComponent,
    Swiper,
    SwiperSlide,
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
