import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class EventsService {

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