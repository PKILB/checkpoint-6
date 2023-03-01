<template>
    <router-link class="selectable" :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="EventCard card my-4 types-color">
            <img class="" :src="event.coverImg" alt="">
            <div class="card-body text-light">
                <h5>
                    <b>{{ event.name }}</b>
                </h5>
                <div>
                    {{ event.location }}
                </div>
                <div>
                    {{ event.startDate }}
                </div>
                <div class="d-flex justify-content-end bottom">
                    Capacity {{ event.capacity }}
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
export default {
    props: {
        event: { type: Event, required: true }
    },

    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.EventCard {
    height: 73vh;
    // width: 4;
    text-shadow: 0 0 4px black;
}



.types-color {
    background-color: #383b46;
}
</style>