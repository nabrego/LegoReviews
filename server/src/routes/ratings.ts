import express, { Request, Response } from "express";
import RatingModel from "../schema/rating";

const router = express.Router();

router.get("/getAllByUserID/:userID", async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const ratings = await RatingModel.find({userID: userID})
        if (ratings.length === 0) {
            res.status(404).send("No ratings found for this user");
        }
        res.status(200).send(ratings);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newRatingBody = req.body;
        const newRating = new RatingModel(newRatingBody);
        const savedRating = await newRating.save();
        res.status(200).send(savedRating);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRatingBody = req.body;
        const rating = await RatingModel.findByIdAndUpdate(
            id,
            newRatingBody,
            { new: true }
        );
        if (!rating) {
            res.status(404).send();
        }
        res.status(200).send(rating);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rating = await RatingModel.findByIdAndDelete(id);
        if (!rating) {
            res.status(404).send();
        }
        res.status(200).send(rating);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
