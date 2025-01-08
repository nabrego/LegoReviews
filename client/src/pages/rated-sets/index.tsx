import { useUser } from "@clerk/clerk-react";

export const RatedSets = () => {
    const { user } = useUser();
    return (
        <div className="rated-sets-container">
            <h1> Hello {user?.firstName}! Here are the sets you've rated!</h1>
        </div>
    );
};