<template>
    <div class="container-fluid">
        <div class="row my-3">
            <div class="col-12 m-auto bg-color">
                <div class="row text-light">
                    <div class="col-4 my-4">
                        <img class="img-fluid" :src="event?.coverImg" alt="">
                    </div>
                    <div class="col-8 my-4">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between">
                                <h5>
                                    {{ event?.name }}
                                </h5>
                                <div>
                                    {{ event?.startDate }}
                                </div>
                            </div>
                        </div>
                        <div class="col-12 my-2">
                            <div>
                                {{ event?.location }}
                            </div>
                        </div>
                        <div class="col-12">
                            <p class="">
                                {{ event?.description }}
                            </p>
                        </div>
                        <div class="col-12 d-flex justify-content-between">
                            <h6>
                                {{ event?.capacity }} Spots Left
                            </h6>
                            <button v-if="!foundTicket" @click="createTicket()" class="btn btn-warning">Attend <i
                                    class="mdi mdi-account-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4 m-auto text-light">
            <div class="col-12">
                See Who Is Attending
            </div>
            <div class="col-12 m-auto">
                <div class="row bg-color">
                    <div v-for="t in tickets" class="col-12">
                        <img :src="t.picture" :title="t.name" alt="" class="img-fluid profile-img">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5 text-light">
            <div class="col-8 m-auto">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            What Are People Saying
                        </div>
                        <div class="row mt-3 bg-color">
                            <div class="col-12 p-4">
                                <div class="text-end mb-2">
                                    Join The Conversation
                                </div>
                                <form class="">
                                    <div class="form-group">
                                        <textarea class="form-control" id="exampleFormControlTextarea1"
                                            placeholder="Tell the peeps!!!" rows="3"></textarea>
                                    </div>
                                </form>
                                <div class="d-flex justify-content-end my-3">
                                    <button class="btn btn-color">Post Comment</button>
                                </div>
                                <div>
                                    All Comments Will Be Here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { watchEffect, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js'
// import { computed } from '@vue/reactivity';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        async function getOneEventById() {
            try {
                const eventId = route.params.eventId
                logger.log(eventId)
                await eventsService.getOneEventById(eventId)
            } catch (error) {
                Pop.error("Go home we don't want you here", "[Getting Event by Id]")
                router.push("/")
            }
        }

        async function getTicketsByEventId() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getTicketsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }

        // onMounted(() => {
        //     getOneEventById()
        // })
        watchEffect(() => {
            if (route.params.eventId) {
                getOneEventById()
                getTicketsByEventId()
            }
        })

        return {
            event: computed(() => AppState.event),
            // account: computed(() => AppState.account)
            tickets: computed(() => AppState.tickets),
            // foundTicket: computed(() => AppState.tickets.find(t => t.id == AppState.event.id)),

            async createTicket() {
                try {
                    await ticketsService.createTicket({ eventId: route.params.eventId })
                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.bg-color {
    background-color: #434653;
}

.profile-img {
    // height: 50%;
    // width: 50%;
    border-radius: 50%;
}

.btn-color {
    background-color: #72ffd5;
}
</style>