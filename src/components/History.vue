<template>
  <b-table striped hover :items="items"></b-table>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
import type {CodeMetadataShort} from "@/model/types";

export default {
  name: 'History',
  props: {
    gatherEntries: Function,
    displayQrCode: Function
  },
  data() {
    return {
      items: [] as CodeMetadataShort[]
    };
  },
  setup() {
    this.gatherEntries()
        .then(data => {
          this.items = data
        })
  },
  methods: {
    async login() {
    }
  }
}
</script>
