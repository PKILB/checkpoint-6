import { Schema } from "mongoose";



export const EventSchema = new Schema(
    {
    name: { type: String, required: true},
    description: { type: String, required: true},
    coverImg: { type: String, required: true, maxLength: 5000},
    location: { type: String, required: true},
    capacity: { type: Number, min: 0, max: 10000},
    startDate: { type: Date, required: true},
    isCanceled: { type: Boolean, default: false, required: true},
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true},

    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, { timestamps: true, toJSON: { virtuals: true }})


EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    count: true,
    ref: 'Event'
})