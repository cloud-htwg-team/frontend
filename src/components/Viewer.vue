<template>
  <img :src="qrCode">
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
