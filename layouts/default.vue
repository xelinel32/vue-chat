<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="768px">
      <v-list subheader>
        <v-subheader>Users list in chat</v-subheader>
        <v-list-tile v-for="u in users" :key="u.id" @click.prevent="">
          <v-list-tile-content>
            <v-list-tile-title>{{ u.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'"
              >chat_bubble</v-icon
            >
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Number of the room {{ user.room }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
    ...mapState(['user', 'users']),
  },
  methods: {
    ...mapMutations(['CLEAR_DATA']),
    exit() {
      this.$socket.emit('USER_LEFT', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.CLEAR_DATA()
      })
    },
  },
}
</script>
