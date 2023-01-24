<template>
  <div>
    Link: <input @input="changeText" value="https://google.de">
    <button @click="generate()">Generate</button>
  </div>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
export default {
  name: 'Generator',
  props: {
    displayQrCode: Function,
    generateQrCode: Function
  },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    async generate() {
      this.generateQrCode(this.text)
          .then(qrCode => {
            this.processQrCode(qrCode)
          })
    },
    changeText(e: any) {
      this.text = e.target.value
    },
  }
}
</script>
