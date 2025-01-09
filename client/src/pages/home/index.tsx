import { useEffect, useState } from 'react';
import axios from 'axios';
import { LegoSet } from '../../types/lego-set';
import { LegoSetCard } from '../../components/lego-set-card';

export const Home = () => {
    const [sets, setSets] = useState<LegoSet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/sets');
                setSets(response.data);
            } catch (err) {
                console.error('Error fetching Lego sets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSets();
    }, []);

    if (loading) {
        return (
            /* From Uiverse.io by Cybercom682 */
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Lego Sets are Loading...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-white">Welcome to the Lego Set Rating Home Page</h1>
            <div className="grid grid-cols-4 gap-6">
                {sets.map((set) => (
                    <LegoSetCard key={set.set_num} set={set} />
                ))}
            </div>
        </div>
    );
};