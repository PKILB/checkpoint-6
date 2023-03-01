<template>
  <div class="container-fluid">
    <div class="row text-light mt-4">
      <div class="col-12">
        My Events
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid"
              src="https://images.unsplash.com/photo-1677665248618-0425412a4cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
