<template>
  <v-flex xs12>
    <v-text-field
      placeholder="Wirite message"
      solo
      v-model="text"
      @keydown.enter="send"
      append-icon="chat_bubble"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    send() {
      this.$socket.emit(
        'CREATE_MESSAGE',
        {
          text: this.text,
          id: this.$store.state.user.id,
        },
        data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.text = ''
          }
        }
      )
    },
  },
}
</script>

<style></style>
