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
}

export const eventsService = new EventsService()