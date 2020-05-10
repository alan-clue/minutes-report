<template>
  <div class="calender">
    <div class="calender__header">
      <div class="calender__prev" v-on:click="changeMonth(0)"></div>
      <h2>March 2020</h2>
      <div class="calender__next" v-on:click="changeMonth(1)">></div>
    </div>
    <div class="calender__body">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeMonth(num) {
    }
  }
}
</script>
<style lang="scss">
.calender {
  &__header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    text-align: center;
    color: #fff;
    font-size: 2rem;
    font-family: Roboto, monospace;
  }
}
</style>