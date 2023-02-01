<template>
  <div class="form-container">
    <div class="form-item"><div class="form-label">Link:</div><input v-model="text" class="form-input"></div>
    <button @click="generate()" class="form-item form-button">Generate</button>
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
      this.generateQrCode?.(this.text)
          .then((qrCode: string) => {
            this.displayQrCode?.(qrCode)
          })
    }
  }
}
</script>
