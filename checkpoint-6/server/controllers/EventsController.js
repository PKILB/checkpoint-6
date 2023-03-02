import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";




export class EventsController extends BaseController {

    constructor () {
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        .get('/:eventId', this.getEventById)
        .get('/:eventId/comments', this.getEventCommentsByEventId)
        .get('/:eventId/tickets')
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
    }


    async getEventById(req, res, next) {
        try {
            
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
            
        } catch (error) {
            next(error)
        }
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            res.send(events)
            
        } catch (error) {
            next(error)
        }
    }

    async getEventCommentsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getEventCommentsByEventId(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            
            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const eventData = req.body
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const event = await eventsService.editEvent(eventId, eventData, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
}


