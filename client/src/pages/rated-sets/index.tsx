import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

export const RatedSets = () => {
    const { user } = useUser();
    return (
        <div>
            <SignedIn>
                <h1>Hello {user?.firstName}! Here are the sets you've rated!</h1>
            </SignedIn>
            <SignedOut>
                <h1> Please sign in to view your rated sets!</h1>
            </SignedOut>
        </div>

    );
};