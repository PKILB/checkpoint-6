import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
    async deleteTicket(ticketId, requestorId) {
        // const ticket = await this.getMyTickets(ticketId)
    }
    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({eventId})
        .populate('profile', 'name picture')
    return tickets
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
        .populate({
            path: 'creator',
            select: 'name picture'
        })
    }
    async createTicket(ticketData) {
        // const event = await dbContext.Events.findById(ticketData.eventId)
        const event = await eventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden('Event is canceled')
        }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate({
            path: 'event',
            populate: {
                path: 'creator',
                select: 'name picture'
            }
        })
            event.capacity--
            await event.save()
        return ticket
    }
}

export const ticketsService = new TicketsService()