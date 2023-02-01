<script setup lang="ts">
import Login from "@/components/Login.vue";
import Generator from "@/components/Generator.vue";
import Viewer from "@/components/Viewer.vue";
import History from "@/components/History.vue";
import Tenant from "@/components/Tenant.vue";
</script>

<template>
  <div class="nav-bar">
    <div v-if="loggedIn" @click="switchTo('generator')" class="nav-item">Generator</div>
    <div v-if="loggedIn" @click="switchTo('history-tenant')" class="nav-item">Tenant History</div>
    <div v-if="loggedIn" @click="switchTo('history-user')" class="nav-item">User History</div>
    <div v-if="!loggedIn" @click="switchTo('login')" class="nav-item">Login</div>
    <div v-if="!loggedIn" @click="switchTo('tenant')" class="nav-item">Create Tenant</div>
  </div>
  <div class="main-container">
    <Login v-if="page === 'login'" :processLoginSuccess="(user: User) => handleLogin(user)"/>
    <Tenant v-if="page === 'tenant'" :createTenant="(name: string, logo: string, premium: boolean) => createTenant(name, logo, premium)"/>
    <Generator v-if="page === 'generator'" :generateQrCode="(toGenerate: string) => connection.generateQrCode(toGenerate)" :displayQrCode="(qrCode: string) => handleQrCode(qrCode)"/>
    <Viewer v-if="page === 'viewer'" :qrCode="currentQrCode"/>
    <History v-if="page === 'history-tenant'" :gatherEntries="() => connection.getTenantEntries()" :displayEntry="(entryId: string) => displayEntry(entryId)"/>
    <History v-if="page === 'history-user'" :gatherEntries="() => connection.getUserEntries()" :displayEntry="(entryId: string) => displayEntry(entryId)"/>
  </div>
</template>

<style scoped>
.nav-bar {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.50);
}

.nav-item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.10);
}

.main-container {
  width: 20rem;
  margin: 1rem auto;
}
</style>

<script type="module" lang="ts">
import type {User} from "@/model/types";
import {BackendConnection} from "@/model/connection";
import {createTenant} from "@/model/authentication";

export default {
  name: 'MainPage',
  data() {
    return {
      page: 'login' as PageType,
      user: {} as User,
      connection: {} as BackendConnection,
      currentQrCode: "",
      loggedIn: false
    };
  },
  methods: {
    async switchTo(page: PageType) {
      this.page = page
      this.loggedIn = !(page == 'login' || page == 'tenant');
    },
    handleLogin(user: User) {
      this.user = user
      this.connection = new BackendConnection(user)
      this.switchTo('generator')
    },
    handleQrCode(code: string) {
      this.currentQrCode = code
      this.switchTo('viewer')
    },
    displayEntry(entryId: string) {
      this.connection.getEntry(entryId)
          .then(entry => {
            this.handleQrCode(entry.qrCode)
          })
    },
    createTenant(name: string, logo: string, premium: boolean) {
      createTenant(name, logo, premium)
          .then(tenantId => {
            if (premium)
              window.location.replace(`${location.protocol}//${name}.${location.hostname}`)
            else
              this.switchTo('login')
          })
    }
  }
}

export type PageType = 'login' | 'tenant' | 'generator' | 'viewer' | 'history-user' | 'history-tenant'
</script>