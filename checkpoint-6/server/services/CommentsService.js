import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class CommentsService {
    async getEventCommentsByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const event = await eventsService.getEventById(commentData.eventId)
        if (event.isCanceled) {
            throw new BadRequest('Event is Canceled')
        }

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }
}

export const commentsService = new CommentsService()