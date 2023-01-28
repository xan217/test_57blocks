<style src="./movie-card.css"></style>
<template src="./movie-card.html"></template>

<script>
import { UserServices } from '@/services/user.service';

export default {
  name: 'MovieCardComponent',
  components: {},
  data: () => ({
    overview: '',
    poster: '',
    rating: 0.0,
    title: '',
    year: '',
    showDetails: false,
    isFavorite: null
  }),
  props: {
    movie: {}
  },
  mounted() {
    console.log(this.movie);
    this.overview = this.movie.overview;
    this.poster = `url(https://image.tmdb.org/t/p/w185${this.movie.poster_path})`;
    this.rating = this.movie.vote_average.toFixed(1);
    this.title = this.movie.title || this.movie.name;
    this.year = (this.movie.release_date || this.movie.first_air_date).substr(0, 4);
    this.isFavorite = this.movie.isFavorite;
    console.log(this.isFavorite);
  },
  methods: {
    openMovie() {
      this.$router.push({name: 'details', params: { movieId: this.movie.id, mediaType: this.movie.media_type }});
    },
    async addFavorite() {
      const success = await UserServices.setFavorite(
        this.movie.media_type,
        this.movie.id,
        !this.isFavorite
      );
      if( success ) this.isFavorite = !this.isFavorite;
    }
  }
}
</script>
