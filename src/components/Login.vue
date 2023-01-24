<template>
  <div>
    Email: <input @input="changeEmail" value="user@qr-regular.com">
    Password: <input @input="changePassword" value="user123">
    <button @click="performLogin()">Login</button>
  </div>
</template>

<style scoped>
</style>

<script type="module" lang="ts">
import {loadUserData, login} from "@/model/authentication";

export default {
  name: 'Login',
  props: {
    processLoginSuccess: Function,
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  setup() {
    loadUserData()
        .then(user => {
          this.processLoginSuccess(user)
        })
  },
  methods: {
    async performLogin() {
      login(this.email, this.password, "regular-92it7") // TODO actual tenantId
          .then(user => {
            this.processLoginSuccess(user)
          })
    },
    changeEmail(e: any) {
      this.email = e.target.value
    },
    changePassword(e: any) {
      this.password = e.target.value
    }
  }
}
</script>
