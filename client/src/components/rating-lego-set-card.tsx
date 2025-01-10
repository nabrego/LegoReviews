import { LegoSet } from "../types/lego-set";
import Select from "react-select";
import { Button } from "./ui/button";
import { useRatings } from "../contexts/rating-contexts";
import { useUser, SignedIn } from "@clerk/clerk-react";
import { useState } from "react";

interface LegoSetCardData {
    set: LegoSet;
}

export const RatingLegoSetCard = ({ set }: LegoSetCardData) => {
    const [rating, setRating] = useState<number>(0);
    const { addRating } = useRatings();
    const { user } = useUser();

    const handleRating = (rating: number) => {
        if (!user) return;

        addRating({
            userID: user.id,
            rating: rating,
            setNum: set.set_num,
            name: set.name,
            year: set.year,
            num_parts: set.num_parts,
            set_img_url: set.set_img_url,
        });
    }

    const options = [
        { value: 1, label: "1"},
        { value: 2, label: "2"},
        { value: 3, label: "3"},
        { value: 4, label: "4"},
        { value: 5, label: "5"},
    ]

    return (
        <div className="h-[450px] w-[300px]bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-[300px] h-[300px] flex items-center justify-center bg-white">
                <img
                    src={set.set_img_url}
                    alt={set.name}
                    className="max-w-[280px] max-h-[280px] object-contain"
                />
            </div>
            <div className="pl-2 h-[150px]">
                <h3 className="text-lg text-zinc-900 font-semibold mb-2 truncate">{set.name}</h3>
                <div className="text-sm text-zinc-600">
                    <p>Set Number: {set.set_num}</p>
                    <p>Year: {set.year}</p>
                    <p>Number of Parts: {set.num_parts}</p>
                    <SignedIn>
                        <div className="flex justify-center items-center mt-1">
                            <Select
                                options = {options}
                                placeholder = "---"
                                onChange={(option) => setRating(option?.value ?? 0)}
                            />
                            <Button className="ml-4 bg-red-600 hover:bg-red-700 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleRating(rating)}>Rate</Button>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};