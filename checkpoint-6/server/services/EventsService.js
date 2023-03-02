import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { ticketsService } from "./TicketsService.js"



class EventsService {
    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)
        // if(event.isCanceled = true) {
        //     throw new BadRequest('This Event is canceled!!')
        // }
        if(event.creatorId.toString() != requestorId) {
            throw new BadRequest('You do not have the permission to delete this Goober')
        }
        event.isCanceled = true
        // if(event.isCanceled = true) {

        // }
        await event.save()
        return event
    }
    async editEvent(eventId, eventData, requestorId) {
        const event = await this.getEventById(eventId)
        if(event.isCanceled == true) {
            throw new BadRequest('This Event is canceled!!')
        }
        
        if(event.creatorId.toString() != requestorId) {
            throw new BadRequest('You do not have the permission to delete this Goober')
        }
            event.name = eventData.name || event.name
            event.description = eventData.description || event.description
        
        await event.save()
        
        return event
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')

        if (!event) {
            throw new BadRequest('Invalid Event Id Dude')
        }
        return event
    }
    async getAllEvents() {
        const events = await dbContext.Events.find()
        .populate('creator', 'name picture')
        .populate('ticketCount')
        return events
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)

        await event.populate('creator')
        return event
    }
}

export const eventsService = new EventsService()