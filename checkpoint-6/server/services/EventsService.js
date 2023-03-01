import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class EventsService {

    async editEvent(eventId, eventData) {
        const event = await dbContext.Events.findById(eventId)
        if(!event) {
            throw new BadRequest('Invalid event Id Ya Goof')
        }

        const creator = await dbContext.Account.findById(eventData.creatorId)
        if(!creator) {
            throw new BadRequest('There is no Event Creator with that Id')
        }
        event.creatorId = eventData.creatorId || event.creatorId
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        event.isCanceled = eventData.isCanceled || event.isCanceled
        event.type = eventData.type || event.type
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
        return events
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)

        await event.populate('creator')
        return event
    }
}

export const eventsService = new EventsService()