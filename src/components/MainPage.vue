<script setup lang="ts">
import Login from "@/components/Login.vue";
import Generator from "@/components/Generator.vue";
import Viewer from "@/components/Viewer.vue";
import History from "@/components/History.vue";
</script>

<template>
  <div>
    <button @click="switchTo('generator')">Generator</button>
    <button @click="switchTo('history-tenant')">Tenant History</button>
    <button @click="switchTo('history-user')">User History</button>
  </div>
  <Login v-if="page === 'login'" :processLoginSuccess="handleLogin"/>
  <Generator v-if="page === 'generator'" :generateQrCode="connection.generateQrCode" :displayQrCode="handleQrCode"/>
  <Viewer v-if="page === 'viewer'" :qrCode="currentQrCode"/>
  <History v-if="page === 'history-tenant'" :gatherEntries="connection.getTenantEntries" :displayQrCode="handleQrCode"/>
  <History v-if="page === 'history-user'" :gatherEntries="connection.getUserEntries" :displayQrCode="handleQrCode"/>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
import type {User} from "@/model/types";
import {BackendConnection} from "@/model/connection";

export default {
  name: 'MainPage',
  data() {
    return {
      page: 'login' as PageType,
      user: {} as User,
      connection: {} as BackendConnection,
      currentQrCode: ""
    };
  },
  methods: {
    async switchTo(page: PageType) {
      this.page = page
    },
    handleLogin(user: User) {
      this.user = user
      this.connection = new BackendConnection(user)
      this.switchTo('generator')
    },
    handleQrCode(code: string) {
      this.currentQrCode = code
      this.switchTo('viewer')
    }
  }
}

export type PageType = 'login' | 'generator' | 'viewer' | 'history-user' | 'history-tenant'
</script>