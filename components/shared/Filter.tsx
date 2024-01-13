'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Badge } from '../ui/badge';

interface Props {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => (
  <div className={`relative ${containerClasses} `}>
    <Select>
      <SelectTrigger
        className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 focus:outline-none`}
      >
        <div className="line-clamp-1 flex-1 text-left focus:outline-none dark:text-light-800">
          <SelectValue placeholder="Filters" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col gap-3 p-0">
          {filters.map((filter) => (
            <SelectItem
              className="w-full rounded-lg px-3 py-2 hover:bg-light-700 hover:outline-none focus:outline-none dark:text-light-800 dark:hover:bg-dark-300"
              key={filter.value}
              value={filter.value}
            >
              {filter.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default Filter;
