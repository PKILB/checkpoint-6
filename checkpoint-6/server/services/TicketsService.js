import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
    async deleteTicket(ticketId, requestorId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        // @ts-ignore
        const event = await eventsService.getEventById(ticket.eventId)


        if (!ticket) {
            throw new BadRequest('Invalid Id')
        }

        if (ticket.accountId.toString() !== requestorId) {
            throw new Forbidden("I'm onto you losers")
        }
        await ticket.remove()
        // @ts-ignore
        event.capacity++
        await event.save()
        return 'This Ticket Has Been Deleted'
    }
    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({eventId})
        .populate('profile', 'name picture')
    return tickets
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
        .populate({
            path: 'event',
            select: 'name picture'
        })
        return tickets
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
            // @ts-ignore
            event.capacity--
            // if(event.capacity = 0) {
            //     throw new BadRequest('There Is No Space For You')
            // }
            await event.save()
        return ticket
    }
}

export const ticketsService = new TicketsService()