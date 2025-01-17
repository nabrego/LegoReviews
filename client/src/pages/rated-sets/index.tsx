import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useRatings } from '../../contexts/rating-contexts';
import { RatedLegoSetCard } from '../../components/rated-lego-set-cards';

export const RatedSets = () => {
    const { ratings } = useRatings();

    return (
        <div>
            <SignedIn>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4 text-center text-zinc-900">Your Rated Lego Sets</h1>
                    <div className="mt-8 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        {ratings.map((rating) => (
                            <div key={rating._id} className="w-full flex justify-center">
                                <RatedLegoSetCard rating={rating} />
                            </div>
                        ))}
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-center text-zinc-900">Please Sign in to View Rated Lego Sets</h1>
                </div>
            </SignedOut>
        </div>
    );
};