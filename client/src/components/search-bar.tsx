interface SearchBarData {
    onSearch: (search: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarData) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.querySelector('input') as HTMLInputElement;
        onSearch(input.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-[1000px]">
            <input
                type="text"
                placeholder="Search Lego Sets"
                className="border border-zinc-300 rounded-md p-2 pl-4 w-full text-left bg-gray-100 rounded-xl"
            />
            <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white ml-4 px-4 py-2 rounded-xl border-2 border-red-800"
            >
                Search
            </button>
        </form>
    );
};