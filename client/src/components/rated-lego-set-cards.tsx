import { Rating } from "../contexts/rating-contexts";
import Select from "react-select";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRatings } from "../contexts/rating-contexts";
import { DeleteButton } from "./delete-button";

interface RatedLegoSetCardData {
    rating: Rating;
}

export const RatedLegoSetCard = ({ rating }: RatedLegoSetCardData) => {
    const [updatedRating, setUpdatedRating] = useState<number>(rating.rating);
    const { updateRating } = useRatings();

    const handleUpdateRating = async (newRating: number) => {
        if(newRating === 0) return;

        try {
            await updateRating(rating._id!, {
                ...rating,
                rating: newRating,
            });
            setUpdatedRating(newRating);
        } catch (err) {
            console.error("Failed to updated rating", err);
        }
    };

    const options = [
        { value: 1, label: "1"},
        { value: 2, label: "2"},
        { value: 3, label: "3"},
        { value: 4, label: "4"},
        { value: 5, label: "5"},
    ]

    return (
        <div className="h-[450px] w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-[300px] h-[300px] flex items-center justify-center bg-white">
                <img
                    src={rating.set_img_url}
                    alt={rating.name}
                    className="max-w-[280px] max-h-[280px] object-contain"
                />
            </div>
            <div className="pl-2 h-[150px]">
                <h3 className="text-lg text-zinc-900 font-semibold mb-2 truncate">{rating.name}</h3>
                <div className="text-sm text-zinc-600">
                    <p>Set Number: {rating.set_num}</p>
                    <p>Your Rating: {rating.rating}/5</p>
                    <div className="flex justify-center items-center mt-1">
                        <Select
                            options = { options }
                            placeholder = "---"
                            onChange={(option) => setUpdatedRating(option?.value ?? 0)}
                        />
                        <Button
                            className="ml-2 mr-2 rounded-xl border-2 border-red-800 bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleUpdateRating(updatedRating)}
                            disabled={updatedRating === rating.rating || updatedRating === 0}
                        >
                            Update
                        </Button>
                        <DeleteButton id={rating._id!}/>
                    </div>
                </div>
            </div>
        </div>
    );
};