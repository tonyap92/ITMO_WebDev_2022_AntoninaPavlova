

<template>
<h1>App Counter</h1>
  <p v-html="innerHTML"></p>

  <CounterValue v-for="obj in [{index:1, text:'Clicked'}]"
      :title="obj.text"
      :value="counter"
  :key="obj.index"
  />

  <button v-on:click="onPlus">+</button>
  <button v-if="canRenderMinusButtonVisible" @click="onMinus">-</button>
</template>

<script>
import CounterValue from "./components/CounterValue.vue";

export default {
  components: {CounterValue},
  data() {
    return {
      counter: 0,
      innerHTML: `<h2>Hello</h2>`
    };
  },
  computed: {
    canRenderMinusButtonVisible() {
  return this.counter > 0;
}
  },
  methods:{
    onPlus() {
      this.counter++;
      console.log('> Counter -> onPlus:', this.counter)
    },
    onMinus() {
      this.counter--;
      console.log('> Counter -> onMinus:', this.counter)
    }
  }
};
</script>

<style scoped>
p.counter-value {
  color: red;
  font-size: 2rem;
  font-weight: normal;
}
</style>
