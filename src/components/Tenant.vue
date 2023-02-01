<template>
  <div>
    Tier: <select v-model="premium">
    <option disabled value="">Select a Tier</option>
    <option value="true">Premium</option>
    <option value="false">Basic</option>
  </select>
    Name: <input v-model="name">
    <input ref="file" type="file" @change="() => this.handleFile()"/>
    <button @click="() => this.handleCreation()">Create Tenant</button>
  </div>
</template>

<style scoped>
</style>

<script type="module" lang="ts">

export default {
  name: 'Tenant',
  props: {
    createTenant: Function,
  },
  data() {
    return {
      name: '',
      logo: File,
      premium: false
    };
  },
  methods: {
    handleCreation() {
      const reader = new FileReader();
      reader.onload = (data) => {
        const logoContent = data.target.result
        this.createTenant(this.name, logoContent, this.premium)
      }
      reader.readAsDataURL(this.logo)
    },
    handleFile() {
      this.logo = this.$refs.file.files[0]
    }
  }
}
</script>
