import { List } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search Employee"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border py-2 pl-12 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
        />
        <List className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-neutral-500" />
      </div>
    </div>
  );
};
