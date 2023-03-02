import { Schema } from "mongoose";



export const CommentSchema = new Schema({
    body: { type: String, required: true, minLength: 5, maxLength: 200 },

    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event'}
}, { timestamps: true, toJSON: { virtuals: true }})


CommentSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})