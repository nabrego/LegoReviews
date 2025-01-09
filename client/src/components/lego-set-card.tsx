import { LegoSet } from "../types/lego-set";

interface LegoSetCardData {
    set: LegoSet;
}

export const LegoSetCard = ({ set }: LegoSetCardData) => {
    return (
        <div className="h-[450px] w-[300px]bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="w-[300px] h-[300px] flex items-center justify-center bg-white">
                <img
                    src={set.set_img_url}
                    alt={set.name}
                    className="max-w-[280px] max-h-[280px] object-contain"
                />
            </div>
            <div className="pl-2 h-[150px]">
                <h3 className="text-lg text-zinc-900 dark:text-white font-semibold mb-2 truncate">{set.name}</h3>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <p>Set Number: {set.set_num}</p>
                    <p>Year: {set.year}</p>
                    <p>Number of Parts: {set.num_parts}</p>
                </div>
            </div>
        </div>
    );
};