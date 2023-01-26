<template>
  <div>
    Link: <input v-model="text">
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
      text: 'https://google.de'
    };
  },
  methods: {
    async generate() {
      this.generateQrCode(this.text)
          .then(qrCode => {
            this.processQrCode(qrCode)
          })
    }
  }
}
</script>
