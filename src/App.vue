<style src="./App.css"></style>
<template src="./App.html"></template>

<script>
import FavoritesPage    from './pages/favorites/favorites.vue';
import HomePage         from './pages/home/home.vue';
import LoginPage        from './pages/login/login.vue';
import MovieDetailsPage from './pages/movie-details/movie-details.vue';

import FooterComponent  from './components/templates/footer/footer.vue';

export default {
  name: 'App',
  components: {
    FavoritesPage,
    HomePage,
    LoginPage,
    MovieDetailsPage,
    FooterComponent
  }
}
</script>
