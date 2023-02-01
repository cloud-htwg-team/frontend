<template>
  <table>
    <tbody>
    <tr>
      <th class="cell">User ID</th>
      <th class="cell">Created At</th>
    </tr>
    <tr class="cell-clickable" v-for="item in items" @click="view(item.entryId)">
      <td class="cell">{{item.userId}}</td>
      <td class="cell">{{new Date(item.createdAt * 1000).toDateString()}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.cell {
  width: 9.5rem;
  max-width: 9.5rem;
  overflow-x: hidden;
}

.cell-clickable {
  cursor: pointer;
}

.cell-clickable:hover {
  background-color: rgba(255, 255, 255, 0.10);
}
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
