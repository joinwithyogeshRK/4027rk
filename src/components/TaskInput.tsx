import { useState } from 'react';
import { useTodoContext } from '@/context/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const TaskInput = () => {
  const { addTask } = useTodoContext();
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskText.trim()) {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description.",
        variant: "destructive"
      });
      return;
    }
    
    addTask({
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate: dueDate?.toISOString(),
      category
    });
    
    // Reset form
    setTaskText('');
    setDueDate(undefined);
    setPriority('medium');
    
    toast({
      title: "Task added",
      description: "Your new task has been added successfully."
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-card p-4 shadow-sm">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="task-input"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {/* Due Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={dueDate ? 'text-foreground' : 'text-muted-foreground'}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, 'PPP') : 'Set due date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        {/* Priority Selector */}
        <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Category Selector */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="ml-auto">
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary-600">
            <Plus className="mr-1 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;