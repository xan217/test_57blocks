<style src="./home.css"></style>
<template src="./home.html"></template>

<script>
import MovieCardComponent from '@/components/common/movie-card/movie-card.vue';
import MovieCardExtendedComponent from '@/components/common/movie-card-extended/movie-card-extended.vue';
import * as Data from '@/assets/mockData.json';

import { MoviesServices } from '@/services/movies.service';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
    moviesTrend: null,
    tvTrend: null,
    extendedCarouselBreakpoints: {
      '320': {
        slidesPerView: 1.1,
        spaceBetween: 20
      },
      '470': {
        slidesPerView: 1.5,
        spaceBetween: 20
      },
      '680': {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      '1300': {
        slidesPerView: 3.5,
        spaceBetween: 50
      }
    },
    carouselBreakpoints: {
      '320': {
        slidesPerView: 1.5,
        spaceBetween: 20
      },
      '640': {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      '768': {
        slidesPerView: 3.5,
        spaceBetween: 40
      },
      '1024': {
        slidesPerView: 3.5,
        spaceBetween: 50
      },
      '1300': {
        slidesPerView: 4.5,
        spaceBetween: 50
      }
    }
  }),
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  mounted() {
    MoviesServices.getTrendingMovies().then( movies => {
      this.moviesTrend = movies
    });

    MoviesServices.getTrendingTV().then( shows => {
      this.tvTrend = shows
    });

    this.favorites = Data.results;
  }
}
</script>
