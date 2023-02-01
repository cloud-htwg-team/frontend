<template>
  <table>
    <tbody>
    <tr>
      <th>User ID</th>
      <th>Created At</th>
    </tr>
    <tr v-for="item in items" @click="() => view(item.entryId)">
      <td>{{item.userId}}</td>
      <td>{{new Date(item.createdAt).toDateString()}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
import type {CodeMetadataShort} from "@/model/types";

export default {
  name: 'History',
  props: {
    gatherEntries: Function,
    displayEntry: Function
  },
  data() {
    return {
      items: [] as CodeMetadataShort[]
    };
  },
  mounted() {
    this.gatherEntries?.()
        .then((data: CodeMetadataShort[]) => {
          this.items = data
        })
  },
  methods: {
    async view(entryId: string) {
      this.displayEntry?.(entryId)
    }
  }
}
</script>
