<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row text-light mt-4">
      <div class="col-12">
        My Events
      </div>
      <div class="col-12">
        <div class="row">
          <div v-for="e in myEvents" :key="e.id" class="col-md-3">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row mt-5 text-light">
      <div class="col-12">
        Upcoming Events

      </div>
      <div class="col-8">

      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const route = useRoute();
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error, "[Getting My Events]")
      }
    }

    onMounted(() => {
      getAllEvents()
    })

    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents),
      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm("Are you sure you want to CANCEL?")) {
            await eventsService.cancelEvent(eventId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
