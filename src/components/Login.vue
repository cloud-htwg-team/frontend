<template>
  <div class="form-container">
    <div class="form-item"><div class="form-label">Tenant:</div><select v-model="currentTenant" class="form-input">
      <option disabled value="">Select a Tenant</option>
      <option value="regular-92it7">Test</option>
      <option v-for="tenant in tenants" :value="tenant.tenantId">{{tenant.displayName}}</option>
    </select></div>
    <div class="form-item"><div class="form-label">Email:</div><input v-model="email" class="form-input"></div>
    <div class="form-item"><div class="form-label">Password:</div><input v-model="password" type="password" class="form-input"></div>
    <button @click="performLogin()" class="form-item form-button">Login</button>
    <button @click="performRegistration()" class="form-item form-button">Register</button>
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
  mounted() {
    loadUserData()
        .then(user => {
          this.processLoginSuccess?.(user)
        }).catch(e => console.log(e.message))
    loadTenants()
        .then(tenants => {
          this.tenants = tenants
        })
  },
  methods: {
    async performLogin() {
      login(this.email, this.password, this.currentTenant)
          .then(user => {
            this.processLoginSuccess?.(user)
          })
    },
    async performRegistration() {
      register(this.email, this.password, this.currentTenant)
          .then(user => {
            this.processLoginSuccess?.(user)
          })
    }
  }
}
</script>
