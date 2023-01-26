<template>
  <div>
    Tenant: <select v-model="currentTenant">
      <option disabled value="">Select a Tenant</option>
      <option value="regular-92it7">Test</option>
      <option v-for="tenant in tenants" :value="tenant.tenantId">{{tenant.displayName}}</option>
    </select>
    Email: <input v-model="email">
    Password: <input v-model="password" type="password">
    <button v-if="!register" @click="performLogin()">Login</button>
    <button v-if="!register" @click="() => register = true">Create Account</button>
    <button v-if="register" @click="performRegistration()">Register</button>
    <button v-if="register" @click="() => register = false">Login</button>
  </div>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
import {
  loadTenants,
  loadUserData,
  login,
  register
} from "@/model/authentication";
import type {TenantInformation} from "@/model/types";

export default {
  name: 'Login',
  props: {
    processLoginSuccess: Function,
  },
  data() {
    return {
      email: 'user@qr-regular.com',
      password: 'user123',
      register: false,
      tenants: [] as TenantInformation[],
      currentTenant: ''
    };
  },
  setup() {
    loadUserData()
        .then(user => {
          this.processLoginSuccess(user)
        })
    loadTenants()
        .then(tenants => {
          this.tenants = tenants
        })
  },
  methods: {
    async performLogin() {
      login(this.email, this.password, this.currentTenant)
          .then(user => {
            this.processLoginSuccess(user)
          })
    },
    async performRegistration() {
      register(this.email, this.password, this.currentTenant)
          .then(user => {
            this.processLoginSuccess(user)
          })
    }
  }
}
</script>
