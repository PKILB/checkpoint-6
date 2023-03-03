import { AppState } from "../AppState.js"
import { TicketEvent } from "../models/Event.js"
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
        AppState.myEvents.push(new TicketEvent(res.data))
        // AppState.myEvents.push(new TicketEvent(res.data))
    }

    async getMyTicketEvents() {
        const res = await api.get('account/tickets')
        logger.log('getting my tickets for the events I will attend', res.data)
        AppState.myEvents = res.data
    }

    async deleteTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log('delete', res.data)
        let i = AppState.tickets.findIndex(t => t.id == ticketId)
        if (i != -1) {
            AppState.tickets.splice(i, 1)
        }
    }
}

export const ticketsService = new TicketsService()