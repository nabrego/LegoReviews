import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export interface Rating {
    _id?: string;
    userID: string;
    rating: number;
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
        const response = await fetch(`http://localhost:3001/ratings/getAllByUserID/${user?.id}`);
        if (response.ok) {
            const ratings = await response.json();
            setRatings(ratings);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, [user]);

    const addRating = async (rating: Rating) => {
        const response = await fetch("http//localhost:3001/ratings", {
            method: "POST", 
            body: JSON.stringify(rating),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        try{
            if (response.ok) {
                const newRating = await response.json();
                setRatings((prev) => [...prev, newRating]);
            }
        } catch (err) {
            console.error("Error adding rating", err);
        }
        
    };

    const updateRating = async (id: string, newRating: Rating) => {
        const response = await fetch(`http//localhost:3001/ratings/${id}`, {
            method: "PUT", 
            body: JSON.stringify(newRating),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        try{
            if (response.ok) {
                const newRating = await response.json();
                setRatings((prev) =>
                    prev.map((rating) => {
                        if (rating._id === id) {
                            return newRating;
                        } else {
                            return rating;
                        }
                    })
                );
            }
        } catch (err) {
            console.error("Error adding rating", err);
        }
        
    };

    const deleteRating = async (id: string) => {
        const response = await fetch(`http//localhost:3001/ratings/${id}`, {
            method: "DELETE", 
        });
        try{
            if (response.ok) {
                const deletedRating = await response.json();
                setRatings((prev) => prev.filter((rating) => rating._id !== deletedRating._id));
            }
        } catch (err) {
            console.error("Error adding rating", err);
        }
    };

    return <RatingsContext.Provider value={{ratings, addRating, updateRating, deleteRating}}>
        {" "}
        {children}
    </RatingsContext.Provider>
};

export const useRatings = () => {
    const context = useContext<RatingContextType | undefined>(RatingsContext);
    if (!context) {
        throw new Error("useRatings must be used within a RatingsProvider");
    }
    return context;
}