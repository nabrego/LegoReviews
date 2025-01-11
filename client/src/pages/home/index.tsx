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

const API_URL = import.meta.env.VITE_API_URL;

export const Home = () => {
    const { ratings } = useRatings();
    const [sets, setSets] = useState<LegoSet[]>([]);
    const [totalSets, setTotalSets] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const cardsPerPage = 12;

    useEffect(() => {
        const fetchSets = async () => {
            setLoading(true);
            try {
                if (searchTerm) {
                    const response = await axios.get(`${API_URL}/api/sets/search/${searchTerm}?page=${currentPage}`);
                    setSets(response.data.results);
                    setTotalSets(response.data.count);
                } else {
                    const response = await axios.get(`${API_URL}/api/sets?page=${currentPage}&limit=${cardsPerPage}`);
                    setSets(response.data);
                    setTotalSets(response.data.count);
                }
            } catch (err) {
                console.error('Error fetching Lego sets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSets();
    }, [currentPage, ratings, searchTerm]);

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SignedOut>
                <h3 className="mb-8 text-center text-zinc-600">*Please Sign in to Rate Lego Sets*</h3>
            </SignedOut>
            <div className="flex justify-center items-center">
                <SearchBar onSearch={handleSearch} />
            </div>
            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                    {sets.map((set) => (
                        <div key={set.set_num} className="w-full flex justify-center">
                            <RatingLegoSetCard set={set} />
                        </div>
                    ))}
                </div>
            )}

            <Pagination className="mt-8 flex justify-center items-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="h-10 px-4 py-2">{currentPage}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (currentPage < (Math.ceil(totalSets / cardsPerPage))) handlePageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};