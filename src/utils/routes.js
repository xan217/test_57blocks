import { createRouter, createWebHashHistory } from 'vue-router';

import ApprovedPage     from '@/pages/approved/approved.vue';
import FavoritesPage    from '@/pages/favorites/favorites.vue';
import HomePage         from '@/pages/home/home.vue';
import LoginPage        from '@/pages/login/login.vue';
import MovieDetailsPage from '@/pages/movie-details/movie-details.vue';

const routes = [
  { path: '/',                  name: 'default',    component: ApprovedPage },
  { path: '/home',              name: 'home',       component: HomePage },
  { path: '/approved',          name: 'approved',   component: ApprovedPage },
  { path: '/login',             name: 'login',      component: LoginPage },
  { path: '/favorites',         name: 'favorites',  component: FavoritesPage },
  { path: '/details/:movieId',  name: 'details',    component: MovieDetailsPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;