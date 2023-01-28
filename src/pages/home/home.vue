<style src="./home.css"></style>
<template src="./home.html"></template>

<script>
import MovieCardComponent from '@/components/common/movie-card/movie-card.vue';
import MovieCardExtendedComponent from '@/components/common/movie-card-extended/movie-card-extended.vue';

import { MoviesServices } from '@/services/movies.service';
import { UserServices } from '@/services/user.service';

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
  async mounted() {
    if(!localStorage.getItem('userInfo')) {
      this.$router.replace('/login');
    }

    let moviesTrend = await MoviesServices.getTrendingMovies();
    let tvTrend = await MoviesServices.getTrendingTV();

    let favoriteMovies = await UserServices.getFavoriteMovies();
    let favoriteTVshows = await UserServices.getFavoriteTV();
    this.favorites = [...favoriteMovies, ...favoriteTVshows];

    if( moviesTrend.length ) {
      favoriteMovies = favoriteMovies.map(film => film.id);
      this.moviesTrend = moviesTrend.map(film => ({...film, isFavorite: !!favoriteMovies.find(id => film.id === id)}) );
    }

    if( tvTrend.length ) {
      favoriteTVshows = favoriteTVshows.map(film => film.id);
      this.tvTrend = tvTrend.map(film => ({...film, isFavorite: !!favoriteTVshows.find(id => film.id === id)}) );
    } 
  }
}
</script>
