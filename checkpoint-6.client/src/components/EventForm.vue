<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createEvent()">
            <div class="modal-body">
                <div class="mb-3">
                    <label for="name" class="form-label">name</label>
                    <input v-model="editable.name" required type="text" class="form-control" id="name"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="coverImg" class="form-label">coverImg</label>
                    <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
                        aria-describedby="emailHelp">
                </div>
                <label for="type" class="form-label">type</label>
                <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="type">
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                </select>
                <div class="mb-3">
                    <label for="description" class="form-label">description</label>
                    <input v-model="editable.description" required type="text" class="form-control" id="description"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="location" class="form-label">location</label>
                    <input v-model="editable.location" required type="text" class="form-control" id="location"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="capacity" class="form-label">capacity</label>
                    <input v-model="editable.capacity" required type="text" class="form-control" id="capacity"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="startDate" class="form-label">startDate</label>
                    <input v-model="editable.startDate" required type="text" class="form-control" id="startDate"
                        aria-describedby="emailHelp">
                </div>
                <!-- <div class="mb-3">
                    <label for="" class="form-label">name</label>
                    <input v-model="editable.name" required type="text" class="form-control" id="name"
                        aria-describedby="emailHelp">
                </div> -->
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <router-link :to="{ name: 'Event', params: { eventId: event.id } }"> -->
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ editable.id ? 'Save Changes' :
                    'Create Event' }}
                </button>
                <!-- </router-link> -->
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Event } from '../models/Event.js';
import { router } from '../router.js';

export default {
    props: {
        event: { type: Event, required: true }
    },

    setup() {

        const editable = ref({
            type: 'concert'
        })

        return {
            editable,
            async createEvent() {
                try {
                    const formData = editable.value
                    const event = await eventsService.createEvent(formData)
                    editable.value = { type: 'concert' }
                    if (event?.id) {
                        router.push({ name: 'Event', params: { eventId: event.id } })
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


<style lang="scss" scoped></style>