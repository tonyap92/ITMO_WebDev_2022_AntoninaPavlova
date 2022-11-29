<template>
  <p class="value" :class="{ alert: isAlert}">
    <span style="color: blue">{{title}}</span>:{{ value }}
  </p>

</template>

<script>
export default {
  props:{
    title:"",
    value:0,
  },
  computed: {
    isAlert() {
      return this.value >= 10;
    },
  }
}
</script>

<style lang="scss" scoped>
.value {
  color: red;
  font-size: 2rem;
  font-weight: normal;

 &.alert {
  background-color: aquamarine;
}
}

</style>