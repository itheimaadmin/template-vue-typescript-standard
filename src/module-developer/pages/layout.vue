<template>
  <div>
    <portal-header />
    <router-view />
    <portal-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PortalHeader from '../components/portal-header/index.vue'
import PortalFooter from '../components/portal-footer/index.vue'

@Component({
  name: 'Layout',
  components: {
    PortalHeader,
    PortalFooter
  }
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
