import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Comment } from "../models/Comment.js"



class CommentsService {

    async getCommentsByEventId(eventId) {
        AppState.comments = []
        const res = await api.get('api/events/' + eventId + '/comments')
        logger.log('getting comments', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
    }
async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('posting a comment', res.data)
    AppState.comments.push(new Comment(res.data))
    
}
}

export const commentsService = new CommentsService()