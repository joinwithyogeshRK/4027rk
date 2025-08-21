import { useState } from 'react';
import { useTodoContext } from '@/context/TodoContext';
import { Task } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TaskEditDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskEditDialog = ({ task, open, onOpenChange }: TaskEditDialogProps) => {
  const { updateTask } = useTodoContext();
  
  const [text, setText] = useState(task.text);
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task.priority || 'medium');
  const [category, setCategory] = useState(task.category || 'Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description.",
        variant: "destructive"
      });
      return;
    }
    
    updateTask({
      ...task,
      text,
      dueDate: dueDate?.toISOString(),
      priority,
      category
    });
    
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully."
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Task description"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Due Date Picker */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full justify-start text-left font-normal ${dueDate ? 'text-foreground' : 'text-muted-foreground'}`}
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
            </div>
            
            {/* Priority Selector */}
            <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Category Selector */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
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
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditDialog;