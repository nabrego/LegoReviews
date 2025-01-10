import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useEffect, useState } from 'react';
import { LegoSet } from '../../types/lego-set';
import { useRatings } from '../../contexts/rating-contexts';

export const RatedSets = () => {
    const { user } = useUser();
    const { ratings } = useRatings();



    return (
        <div>
            <SignedOut>
                <h1> Please sign in to view your rated sets!</h1>
            </SignedOut>
            <SignedIn>
                <h1 className="text-3xl font-bold mb-4 text-center text-zinc-900">Hello {user?.firstName}! Here are the sets you've rated!</h1>
            </SignedIn>
        </div>

    );
};