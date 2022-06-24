<template>
  <a-config-provider :locale="locale">
    <div id="app" class="app app1">
      <router-view class="scrollbar"/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import '@/assets/base.css'
export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {

  }
}
</script>
<style>
  .app {
    overflow: auto;
    border  : none;
  }
  .scrollbar {
    margin: 0 auto;
  }

</style>
