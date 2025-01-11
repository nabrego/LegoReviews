interface SearchBarData {
    onSearch: (search: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarData) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    return (
        <label className="flex items-center w-full max-w-[1000px]">
            <input
                type="text"
                placeholder="Search Lego Sets"
                className="border border-zinc-300 rounded-md p-2 pl-4 w-full text-left bg-gray-100 rounded-xl"
                onChange={handleChange}
            />
        </label>
    );
};