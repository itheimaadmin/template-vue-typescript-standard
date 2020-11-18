<template>
  <header>
    <h1>vue + ts 代码规范示例</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CommonHeader'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
