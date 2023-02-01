<template>
  <img :src="`data:image/jpeg;base64,${qrCode}`" class="qr-code">
</template>

<style scoped>
.qr-code {
  width: 20rem;
}
</style>

<script type="module" lang="ts">
export default {
  name: 'Viewer',
  props: {
    qrCode: String,
  }
}
</script>
