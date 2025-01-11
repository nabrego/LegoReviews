import { LegoSet } from "../types/lego-set";
import Select from "react-select";
import { Button } from "./ui/button";
import { useRatings } from "../contexts/rating-contexts";
import { useUser, SignedIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface LegoSetCardData {
    set: LegoSet;
}

export const RatingLegoSetCard = ({ set }: LegoSetCardData) => {
    const [rating, setRating] = useState<number>(0);
    const [stats, setStats] = useState<{avgRating: number, totalRatings: number}>({avgRating: 0, totalRatings: 0});
    const { addRating, ratings } = useRatings();
    const { user } = useUser();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/ratings/stats/${set.set_num}`);
                setStats(response.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        }
        fetchStats();
    }, [set.set_num, ratings]);

    const ratingExists = ratings.some(r => r.set_num === set.set_num && r.userID === user?.id);
    const existingRating = ratings.find(r => r.set_num === set.set_num && r.userID === user?.id);

    const handleRating = (rating: number) => {
        if (!user || rating === 0 || ratingExists) return;

        addRating({
            userID: user.id,
            rating: rating,
            set_num: set.set_num,
            name: set.name,
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
        <div className="h-[450px] w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
                    <p>Average Rating: {stats.avgRating}/5 from {stats.totalRatings} rating(s)</p>
                    <SignedIn>
                        <div className="flex justify-center items-center mt-1">
                            <Select
                                options = {options}
                                placeholder = {ratingExists ? `${existingRating?.rating}`: "---"}
                                onChange={(option) => setRating(option?.value ?? 0)}
                                isDisabled={ratingExists}
                            />
                            <Button
                                className={`ml-2 ${ratingExists ? "bg-zinc-400" : "bg-red-600 hover:bg-red-700 border-2 border-red-800"} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300`}
                                onClick={() => handleRating(rating)}
                                disabled={ratingExists}
                            >
                                {ratingExists ? "Rated" : "Rate"}
                            </Button>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};