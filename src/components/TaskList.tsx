import { useTodoContext } from '@/context/TodoContext';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Trash2, Edit, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import TaskEditDialog from './TaskEditDialog';

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const { toggleTask, deleteTask } = useTodoContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleToggle = (taskId: string) => {
    toggleTask(taskId);
    toast({
      title: "Task updated",
      description: "Task status has been updated."
    });
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: "Task deleted",
      description: "Task has been removed."
    });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    
    return format(date, 'MMM d');
  };

  const getDueDateColor = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isPast(date)) return 'text-error';
    if (isToday(date)) return 'text-warning';
    
    return 'text-muted-foreground';
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`task-card ${task.completed ? 'opacity-70' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleToggle(task.id)}
                className="task-checkbox mt-1"
              />
              <div className="ml-3">
                <label 
                  htmlFor={`task-${task.id}`} 
                  className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                >
                  {task.text}
                </label>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  {/* Priority Indicator */}
                  <span className="flex items-center">
                    {task.priority === 'high' && (
                      <>
                        <span className="priority-dot priority-high"></span>
                        <span className="text-error">High Priority</span>
                      </>
                    )}
                    {task.priority === 'medium' && (
                      <>
                        <span className="priority-dot priority-medium"></span>
                        <span className="text-warning">Medium Priority</span>
                      </>
                    )}
                    {task.priority === 'low' && (
                      <>
                        <span className="priority-dot priority-low"></span>
                        <span className="text-success">Low Priority</span>
                      </>
                    )}
                  </span>
                  
                  {/* Due Date */}
                  {task.dueDate && (
                    <span className={`flex items-center ${getDueDateColor(task.dueDate)}`}>
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDueDate(task.dueDate)}
                    </span>
                  )}
                  
                  {/* Category Tag */}
                  {task.category && (
                    <span className="category-tag bg-primary/10 text-primary">
                      {task.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => handleEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-error"
                onClick={() => handleDelete(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Edit Task Dialog */}
      {editingTask && (
        <TaskEditDialog 
          task={editingTask} 
          open={!!editingTask} 
          onOpenChange={() => setEditingTask(null)} 
        />
      )}
    </div>
  );
};

export default TaskList;