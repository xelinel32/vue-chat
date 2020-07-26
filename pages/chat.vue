<template>
  <h1>CHAT Page {{ user.name }}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'chatPage',
  middleware: ['chat'],
  head() {
    return {
      title: `Room ${this.user.room}`,
    }
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style></style>
