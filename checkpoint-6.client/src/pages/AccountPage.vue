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

    <div class="row">
      <div class="col-12">
        <!-- <li>
          <button @click="cancelEvent(event.id)"
            v-if="account.id && route.name == 'Event' && event?.creatorId == account.id" class="btn btn-danger"
            :disabled="event.isCanceled">
            {{ event.isCanceled ? 'isCanceled' : 'close event' }}
          </button>
        </li> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to CANCEL?')) {
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
