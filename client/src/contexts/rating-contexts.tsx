import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface Rating {
    _id?: string;
    userID: string;
    rating: number;
    set_num: string;
    name: string;
    set_img_url: string;
}

interface RatingContextType {
    ratings: Rating[];
    addRating: (record: Rating) => void;
    updateRating: (id: string, newRating: Rating) => void;
    deleteRating: (id: string) => void;
}

export const RatingsContext = createContext<RatingContextType | undefined>(undefined);

export const RatingsProvider = ({children}: {children: React.ReactNode}) => {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const { user } = useUser();

    const fetchRatings = async() => {
        if (!user) return;
        try {
            const response = await axios.get(`${API_URL}/ratings/getAllByUserID/${user?.id}`);
            setRatings(response.data);
        } catch (err) {
            console.error("Error fetching ratings", err);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, [user]);

    const addRating = async (rating: Rating) => {
        try {
            const response = await axios.post(`${API_URL}/ratings`, rating, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setRatings((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Error adding rating", err);
        }
    };

    const updateRating = async (id: string, newRating: Rating) => {
        try {
            const response = await axios.put(`${API_URL}/ratings/${id}`, newRating, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.data) {
                setRatings((prev) => 
                    prev.map((rating) => 
                        rating._id === id ? response.data : rating
                    )
                );
            }
        } catch (err) {
            console.error("Error updating rating", err);
            throw err;
        }
    };

    const deleteRating = async (id: string) => {
        try {
            const response = await axios.delete(`${API_URL}/ratings/${id}`);
            setRatings((prev) => prev.filter((rating) => rating._id !== response.data._id));
        } catch (err) {
            console.error("Error deleting rating", err);
            throw err;
        }
    };

    return (
        <RatingsContext.Provider value={{ratings, addRating, updateRating, deleteRating}}>
            {children}
        </RatingsContext.Provider>
    );
};

export const useRatings = () => {
    const context = useContext<RatingContextType | undefined>(RatingsContext);
    if (!context) {
        throw new Error("useRatings must be used within a RatingsProvider");
    }
    return context;
};