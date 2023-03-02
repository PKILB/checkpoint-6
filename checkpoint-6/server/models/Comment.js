import { Schema } from "mongoose";



export const CommentSchema = new Schema({

    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event'}
}, { timestamps: true, toJSON: { virtuals: true }})


CommentSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})