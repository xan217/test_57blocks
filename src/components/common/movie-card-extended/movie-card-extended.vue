<style src="./movie-card-extended.css"></style>
<template src="./movie-card-extended.html"></template>

<script>
export default {
  name: 'MovieCardExtendedComponent',
  components: {

  },
  data: () => ({
    overview: '',
    poster: '',
    rating: 0.0,
    title: '',
    type_show: false,
    year: '',
    showDetails: false
  }),
  props: {
    movie: {}
  },
  mounted() {
    this.overview = this.movie.overview;
    this.poster = `url(https://image.tmdb.org/t/p/w185${this.movie.poster_path})`;
    this.rating = this.movie.vote_average.toFixed(1)*10;
    this.title = this.movie.title || this.movie.name;
    this.type_show = this.movie.media_type === 'tv';
    this.year = (this.movie.release_date || this.movie.first_air_date).substr(0, 4);
  }
}
</script>
