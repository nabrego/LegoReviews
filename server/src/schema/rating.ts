import mongoose from "mongoose";

interface Rating {
    userID: string;
    rating: number;
}

const ratingSchema = new mongoose.Schema<Rating>({
    userID: { type: String, required: true },
    rating: { type: Number, required: true },
});

const RatingModel = mongoose.model<Rating>('Rating', ratingSchema);

export default RatingModel;