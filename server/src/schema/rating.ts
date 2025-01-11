import mongoose from "mongoose";

interface Rating {
    userID: string;
    rating: number;
    set_num: string;
    name: string;
    set_img_url: string;
}

const ratingSchema = new mongoose.Schema<Rating>({
    userID: { type: String, required: true },
    rating: { type: Number, required: true },
    set_num: { type: String, required: true },
    name: { type: String, required: true },
    set_img_url: { type: String, required: true },
});

const RatingModel = mongoose.model<Rating>('Rating', ratingSchema);

export default RatingModel;