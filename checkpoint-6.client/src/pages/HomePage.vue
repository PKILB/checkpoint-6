<template>
  <div class="container-fluid">
    <div class="row text-light my-3">
      <div class="col-12 bg-image">
        <div class="row ms-3">
          <div class="col-12 my-5 fs-4">
            <div class="mb-3">
              Tired of all those scalping nerds?
            </div>
            <div class="mb-3">
              Reserve your spot NOW with
            </div>
            <div class="mb-3">
              real events with true nerds.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 m-auto">
        <div class="types-color p-3 d-flex justify-content-around">
          <button class="btn btn-outline-light">Concert</button>
          <button class="btn btn-outline-light">Convention</button>
          <button class="btn btn-outline-light">Digital</button>
          <button class="btn btn-outline-light">Sport</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 m-auto">
        <div class="row">
          <div class="col-md-4" v-for="e in events" :key="e.id">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { onMounted, computed } from 'vue';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error, "[Getting AllEvents]");
      }
    }
    onMounted(() => {
      getAllEvents();
    });

    return {
      events: computed(() => AppState.events)
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.bg-image {
  background-image: url(https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjBzZWF0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60);
  object-fit: cover;
}
</style>
