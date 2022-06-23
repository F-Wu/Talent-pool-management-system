<template>
  <div class="dashboard-container">
    <component :is="currentRole"
               :parent-fun="parentFun" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data () {
    return {
      currentRole: 'adminDashboard',
      username: this.$route.query.username
    }
  },
  computed: {
    ...mapGetters(['roles']),
  },
  methods: {
    parentFun () {
      username = this.username

    }
  }
}
</script>
