import { Profile } from "./Account.js"


export class Event {
    constructor (data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleString()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = new Profile(data.creator)
    }
}

export class TicketEvent extends Event {
    constructor (data) {
            super(data.event) 
            this.ticketId = data.id
    }
}