<template>
  <div class="form-container">
    <div class="form-item"><div class="form-label">Tier:</div><select v-model="premium" class="form-input">
    <option disabled value="">Select a Tier</option>
    <option value="p">Premium</option>
    <option value="b">Basic</option>
  </select></div>
    <div class="form-item"><div class="form-label">Name:</div><input v-model="name" class="form-input"></div>
    <input id="file" ref="file" type="file" @change="() => handleFile()" class="form-item"/>
    <button @click="() => handleCreation()" class="form-item form-button">Create Tenant</button>
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
      logo: {} as Blob,
      premium: "b"
    };
  },
  methods: {
    handleCreation() {
      const reader = new FileReader();
      reader.onload = (data) => {
        const logoContent: string = data.target?.result as string
        this.createTenant?.(this.name, logoContent, this.premium == "p")
      }
      reader.readAsDataURL(this.logo)
    },
    handleFile() {
      //@ts-ignore
      this.logo = document.getElementById("file").files[0] as Blob
    }
  }
}
</script>
