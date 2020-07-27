<template>
  <div class="c-wrap">
    <div class="c-chat" ref="chatBlock"></div>
    <message
      v-for="m in messages"
      :key="m.id"
      :name="m.name"
      :text="m.text"
      :owner="m.id === user.id"
    />
    <div class="c-form">
      <chat-form />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'
export default {
  name: 'chatPage',
  middleware: ['chat'],
  head() {
    return {
      title: `Room ${this.user.room}`,
    }
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.chatBlock.scrollTop = this.$refs.chatBlock.scrollHeight
      })
    },
  },
  components: {
    Message,
    ChatForm,
  },
  computed: {
    ...mapState(['user', 'messages']),
  },
}
</script>

<style scoped lang="scss">
.c {
  &-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  &-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background-color: #212121;
  }
  &-chat {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }
}
</style>
