import { useEffect, useState } from 'react';
import axios from 'axios';
import { SignedOut } from "@clerk/clerk-react";
import { LegoSet } from '../../types/lego-set';
import { RatingLegoSetCard } from '../../components/rating-lego-set-card';
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '../../components/ui/pagination';
import { useRatings } from '../../contexts/rating-contexts';
import { SearchBar } from '../../components/search-bar';

export const Home = () => {
    const { ratings } = useRatings();
    const [sets, setSets] = useState<LegoSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredSets, setFilteredSets] = useState<LegoSet[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/sets?page=${currentPage}&limit=${cardsPerPage}`);
                setSets(response.data);
                setFilteredSets(response.data);
            } catch (err) {
                console.error('Error fetching Lego sets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSets();
    }, [currentPage, ratings]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }

    const handleSearch = async (search: string) => {
        const filtered = sets.filter(set =>
            set.name.toLowerCase().includes(search.toLowerCase()) ||
            set.set_num.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSets(filtered);
    };

    if (loading) {
        return (
            /* From Uiverse.io by Cybercom682 */
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                    <p className="text-zinc-600">
                        Lego Sets are Loading...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <SignedOut>
                <h3 className="mb-8 text-center text-zinc-600">*Please Sign in to Rate Lego Sets*</h3>
            </SignedOut>
            <div className="flex justify-center items-center">
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {filteredSets.map((set) => (
                    <div key={set.set_num} className="w-full flex justify-center">
                        <RatingLegoSetCard set={set} />
                    </div>
                ))}
            </div>

            <Pagination className="mt-8 -ml-3 flex justify-center items-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`/?page=${currentPage - 1}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="h-10 px-2 py-2 flex items-center justify-center">
                            {currentPage}
                        </span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`/?page=${currentPage + 1}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};