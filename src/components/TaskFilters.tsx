import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskFiltersProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  categories: string[];
}

const TaskFilters = ({ 
  filter, 
  setFilter, 
  categoryFilter, 
  setCategoryFilter, 
  categories 
}: TaskFiltersProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className={filter === 'all' ? 'filter-btn-active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={filter === 'active' ? 'filter-btn-active' : 'filter-btn'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={filter === 'completed' ? 'filter-btn-active' : 'filter-btn'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>
      
      {categories.length > 0 && (
        <Select 
          value={categoryFilter || ''} 
          onValueChange={(value) => setCategoryFilter(value || null)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default TaskFilters;