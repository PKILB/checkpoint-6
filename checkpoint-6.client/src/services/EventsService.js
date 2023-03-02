import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"



class EventsService {
    async getAllEvents() {
        const res = await api.get('api/events')
        logger.log('getting all events', res.data)
        const events = res.data.map(e => new Event(e))
        AppState.events = events
    }

    async getOneEventById(eventId) {
        AppState.event = null
        const res = await api.get('api/events/' + eventId)
        logger.log('getting one event by Id', res.data)
        AppState.event = new Event(res.data)
    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log('creating event', res.data)
    }

    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        logger.log('cancel', res.data)
        AppState.event = new Event(res.data)
    }
}

export const eventsService = new EventsService()