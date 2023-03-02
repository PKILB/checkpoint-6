<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row text-light mt-4">
      <div class="col-12">
        My Events
      </div>
      <div class="col-12">
        <div class="row">
          <div v-for="e in myEvents" class="col-md-3">
            <EventCard :event="a" />
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
      myEvents: computed(() => AppState.myEvents),

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
