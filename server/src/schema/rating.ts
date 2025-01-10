import mongoose from "mongoose";

interface Rating {
    userID: string;
    rating: number;
    setNum: string;
}

const ratingSchema = new mongoose.Schema<Rating>({
    userID: { type: String, required: true },
    rating: { type: Number, required: true },
    setNum: { type: String, required: true },
});

const RatingModel = mongoose.model<Rating>('Rating', ratingSchema);

export default RatingModel;