<template><div></div></template>

<script>
import { UserServices } from '@/services/user.service';

export default {
  name: 'ApprovedPage',
  components: {},
  async mounted() {
    const requestToken = new URL(window.location.href).searchParams.get('request_token');
    console.log(requestToken);
    
    const userSet = await UserServices.setUser(requestToken);
    console.log(userSet);

    this.$router.push(userSet ? 'home' : 'login')
    
  }
}
</script>
