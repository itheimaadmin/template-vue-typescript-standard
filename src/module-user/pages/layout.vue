<template>
  <div>
    <module-header />
    <router-view />
    <module-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ModuleHeader from '../components/module-header/index.vue'
import ModuleFooter from '../components/module-footer/index.vue'

@Component({
  name: 'Layout',
  components: {
    ModuleHeader,
    ModuleFooter
  }
})
export default class extends Vue {}
</script>
