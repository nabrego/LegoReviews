import mongoose from "mongoose";

interface Rating {
    userID: string;
    rating: number;
    setNum: string;
    name: string;
    year: number;
    num_parts: number;
    set_img_url: string;
}

const ratingSchema = new mongoose.Schema<Rating>({
    userID: { type: String, required: true },
    rating: { type: Number, required: true },
    setNum: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    num_parts: { type: Number, required: true },
    set_img_url: { type: String, required: true },
});

const RatingModel = mongoose.model<Rating>('Rating', ratingSchema);

export default RatingModel;