<template><div></div></template>

<script>
import { UserServices } from '@/services/user.service';

export default {
  name: 'ApprovedPage',
  components: {},
  async mounted() {
    const requestToken = new URL(window.location.href).searchParams.get('request_token');
    
    const userSet = await UserServices.setUser(requestToken);

    this.$router.push(userSet ? 'home' : 'login')
    
  }
}
</script>
