<template>
  <div class="wrapper-dia" v-show="visible">
    <div class="dialog">
      <header>{{title}}
        <span class="close" @click="close" >×</span>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: ['title', 'visible'],
  methods: {
    close(){
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="scss">
  .wrapper-dia{
    position: fixed;
    z-index: 10;
    background: hsla(0,0%,0%,0.25);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog{
      background: white;
      min-height: 4em;
      min-width: 10em;
      border-radius: 5px;
      color: #666;
      >header{
        padding: 16px 20px;
        display: flex;
        font-size: 18px;
        justify-content: space-between;
        .close {
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
      >main {
        padding: 8px 20px;
      }
    }
</style>
