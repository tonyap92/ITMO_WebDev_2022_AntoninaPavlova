<template>
  <p class="value">
    <span style="color: blue">{{title}}</span>:{{ value }}
  </p>
</template>

<script>
export default {
  props:{
    title:"",
    value:0,
  }
}
</script>

<style scoped>
.value {
  color: red;
  font-size: 2rem;
  font-weight: normal;
}
</style>