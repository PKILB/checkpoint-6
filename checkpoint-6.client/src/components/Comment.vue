<template>
    <form @submit.prevent="handleSubmit" class="">
        <div class="form-group">
            <textarea required name="body" v-model="editable.body" class="form-control" id="body"
                placeholder="Tell the peeps!!!" rows="3">
                                                                    </textarea>
            <div class="d-flex justify-content-end my-3">
                <button aria-label="Post Comment" type="submit" class="btn btn-color">Post Comment</button>
            </div>
        </div>
    </form>
</template>


<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js'
import { useRoute } from 'vue-router';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            profile: computed(() => AppState.account),


            async handleSubmit() {
                try {
                    // window.event.preventDefault()
                    const commentData = editable.value
                    commentData.eventId = route.params.eventId
                    // let form = window.event.target
                    // const comment = editable.value.id
                    await commentsService.createComment(commentData)

                    // editable.value = {}

                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.btn-color {
    background-color: #72ffd5;
}
</style>