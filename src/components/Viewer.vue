<template>
  <img :src="`data:image/jpeg;base64,${qrCode}`">
</template>

<style scoped>
</style>

<script type="module" lang="ts">
export default {
  name: 'Viewer',
  props: {
    qrCode: String,
  }
}
</script>
