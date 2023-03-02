import { AppState } from "../AppState.js"
import { TicketProfile } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketsService {

    async getTicketsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('get tickets', res.data)
        AppState.tickets = res.data.map(t => new TicketProfile(t))
    }
    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        logger.log('create ticket', res.data)
        AppState.tickets.push(new TicketProfile(res.data))
        // AppState.myEvents.push(new TicketEvent(res.data))
    }
}

export const ticketsService = new TicketsService()