<style src="./movie-details.css"></style>
<template src="./movie-details.html"></template>

<script>
import PersonCardComponent from '@/components/common/person-card/person-card.vue'
import { MoviesServices } from '@/services/movies.service';
import { UserServices } from '@/services/user.service';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';

export default {
  name: 'MovieDetailsPage',
  components: {
    PersonCardComponent,
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    movie: {},
    crew: [],
    crewVisibleSlides: [],
    cast: [],
    castVisibleSlides: [],
    carouselBreakpoints: {
      '320': {
        slidesPerView: 4.5,
        spaceBetween: 20
      },
      '640': {
        slidesPerView: 4.5,
        spaceBetween: 20
      },
      '768': {
        slidesPerView: 5.5,
        spaceBetween: 40
      },
      '1024': {
        slidesPerView: 6.5,
        spaceBetween: 50
      },
      '1300': {
        slidesPerView: 8.5,
        spaceBetween: 20
      }
    },
    swiperCastIndex: 0
  }),
  async mounted() {

    MoviesServices
      .getMovieDetails(this.$route.params.movieId)
      .then(result => {
        this.movie = {...this.movie, ...result};
        this.movie.title = this.movie.title || this.movie.name;
        this.movie.genres = this.movie.genres.map(genre => genre.name).join(', ');
        this.movie.companies = this.movie.production_companies.map(comapny => comapny.name).join(', ');
        let relDate = this.movie.release_date || this.movie.first_air_date;
        this.movie.year = relDate.substr(0,4);
        this.movie.release_date = `${relDate.substr(8,2)}/${relDate.substr(5,2)}/${relDate.substr(0,4)}`;
        this.movie.duration = this.convertMinsToHrsMins(this.movie.runtime) || `Seasons: ${this.movies.seasons.length}`;
        this.movie.rating = this.movie.vote_average.toFixed(1)*10;
        this.movie.poster = `https://image.tmdb.org/t/p/w500${ this.movie.poster_path }`;
        this.movie.backdrop = `url(https://image.tmdb.org/t/p/w1280${ this.movie.backdrop_path })`;
      });

      let favoriteMovies = await UserServices.getFavoriteMovies();
      let favoriteTVshows = await UserServices.getFavoriteTV();
      favoriteMovies = [...favoriteMovies.map(film => film.id)];
      favoriteTVshows = [...favoriteTVshows.map(film => film.id)];

      this.movie = {
        ...this.movie,
        isFavorite: !!favoriteMovies.find(id => id === this.$route.params.movieId) || !!favoriteTVshows.find(id => id === this.$route.params.movieId),
        mediaType: this.$route.params.mediaType === 'movie'
      };

      MoviesServices
        .getCredits(this.$route.params.movieId)
        .then( credits => {
          this.crew = credits.crew.filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.id === value.id
            ))
          )
          this.crewVisibleSlides = this.crew.slice(0, 20);

          this.cast = credits.cast.filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.id === value.id
            ))
          )
          this.castVisibleSlides = this.cast.slice(0, 20);
        });
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {
    /** StackOverflow Solution */
    /** https://stackoverflow.com/questions/4687723/how-to-convert-minutes-to-hours-minutes-and-add-various-time-values-together-usi */
    convertMinsToHrsMins(mins) {
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
      m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
      return `${h}h ${m}m`;
    },
    validateIndexPositionCast( swiper ) {
      const actualPosition = this.carouselBreakpoints[Number(swiper.currentBreakpoint)].slidesPerView + swiper.activeIndex;
      if(actualPosition < this.cast.length && actualPosition >= this.castVisibleSlides.length) {
        this.castVisibleSlides = [...this.castVisibleSlides, ...this.cast.slice(actualPosition, actualPosition + 20)];
      }
    },
    validateIndexPositionCrew( swiper ) {
      const actualPosition = this.carouselBreakpoints[Number(swiper.currentBreakpoint)].slidesPerView + swiper.activeIndex;
      if(actualPosition < this.crew.length && actualPosition >= this.castVisibleSlides.length) {
        this.crewVisibleSlides = [...this.crewVisibleSlides, ...this.crew.slice(actualPosition, actualPosition + 20)];
      }
    },
    goBack() {
      this.$router.back();
    },
    async setFavorite() {
      const success = await UserServices.setFavorite(
        this.movie.media_type,
        this.movie.id,
        !this.movie.isFavorite
      );
      if( success ) this.movie.isFavorite = !this.movie.isFavorite;
    }
  }
  
}
</script>
