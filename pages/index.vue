<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="600px">
        <v-card-title>
          <h1>Vue chat</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Your name"
              required
            ></v-text-field>
            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Write room"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!valid" color="primary" @click="submit">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: 'empty',
  head: {
    title: 'Welcome to Vue chat',
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 10) || 'Имя не должно превышать 16 символов',
    ],
    room: '',
    roomRules: [v => !!v || 'Введите комнату'],
  }),
  sockets: {
    connect() {
      console.log('socket connected')
    },
  },
  methods: {
    ...mapMutations(['SET_USER']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
        }

        this.$socket.emit('USER_JOIN', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.SET_USER(user)
            this.$router.push('/chat')
          }
        })
      }
    },
  },
}
</script>
