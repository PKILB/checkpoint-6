<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row text-light mt-4">
      <div class="col-12">
        My Events
      </div>
      <div class="col-12 m-auto">
        <div class="row">
          <div v-for="ticket in myEvents" :key="ticket.id" class="col-md-4">
            <EventCard :event="ticket.event" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container">
    <div class="row mt-5 text-light">
      <div class="col-12">
        Upcoming Events -->

  <!-- </div> -->
  <!-- <div class="col-8">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-4">
                Are You even working
                <img :src="event?.coverImg" alt="">
              </div>
              <div class="col-8">
                {{ tickets.length }}
              </div>
            </div>
          </div>
        </div>
      </div> -->
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    const route = useRoute();

    // async function getTicketsByEventId

    // async function getAllEvents() {
    //   try {
    //     await eventsService.getAllEvents()
    //   } catch (error) {
    //     Pop.error(error, "[Getting My Events]")
    //   }
    // }

    // onMounted(() => {
    //   getAllEvents()
    // })

    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents),
      tickets: computed(() => AppState.tickets),

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
