<style src="./favorites.css"></style>
<template src="./favorites.html"></template>

<script>
import { UserServices } from '@/services/user.service';
import MovieCardExtendedComponent from '@/components/common/movie-card-extended/movie-card-extended.vue';

export default {
  name: 'FavoritesPage',
  components: {
    MovieCardExtendedComponent
  },
  data: () => ({
    favoriteMovies: [],
    favoriteTVshows: []
  }),
  async mounted() {
    this.favoriteMovies = await UserServices.getFavoriteMovies();
    this.favoriteTVshows = await UserServices.getFavoriteTV();
  }
}
</script>
