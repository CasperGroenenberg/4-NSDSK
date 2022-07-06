export const messageMixin = data => {
  return {
    data: function () {
      return {
        messages: []
      }
    },
    mounted () {
      data.forEach(item => {
        this.messages.push({
          name: item.name,
          message: item.message,
          show: false
        })
      })
    },
    computed: {
      Messages () {
        const hasMessages = this.messages.some(message => {
          return message.show
        })
        return hasMessages
      }
    },
    methods: {
      showMessage (messageName) {
        const msg = this.messages.find(message => message.name === messageName)
        return msg?.show
      },
      getMessage (messageName) {
        const msg = this.messages.find(message => message.name === messageName)
        return msg?.message
      },
      setMessage (messageName) {
        const msg = this.messages.find(message => message.name === messageName)
        msg.show = true
      },
      resetMessages () {
        this.messages.forEach(message => {
          message.show = false
        })
      }
    }
  }
}
