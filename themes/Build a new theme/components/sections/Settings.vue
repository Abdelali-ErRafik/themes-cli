<template>
  <!-- You can delete this file -->
  <div>
    <h2>Settings</h2>
    <div>
      {{ $settings }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: null
    }
  },
  mounted() {
    this.settings = this.$settings
    console.log(this.$settings)
  }
}
</script>
