import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatDateStringToString } from '@/lib/formatter';
import { TTodo } from '../../../types/todoType';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

interface TodoItemListProps {
  todoList: TTodo[];
  onDelete: (todo: TTodo) => void;
  onEdit: (todo: TTodo) => void;
  onComplete: () => void;
  className?: string;
}

const TodoItemList: React.FC<TodoItemListProps> = ({
  todoList,
  onDelete,
  onEdit,
  onComplete,
  className,
}) => {
  return (
    <ul className={cn("w-full", className)}>
      {todoList.map((todo) => (
        <li
          key={todo.id}
          className="mb-4 flex flex-row gap-4 items-center bg-gray-800 p-4 rounded-lg"
        >
          <Input type="checkbox" onChange={onComplete} className='w-5 h-5'/>
          <div>
            <p className="text-2xl">{todo.title}</p>
            <p>{todo.category}</p>
            {/* <p>{formatDateToString(todo.createdAt)}</p> */}
          </div>
          <div className="ml-auto mr-4 text-center">
            <p>Data de Conclusão:</p>
            <p>{formatDateStringToString(todo.targetDate)}</p>
          </div>
          <Button onClick={() => onEdit(todo)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => onDelete(todo)}>
            <DeleteOutlined />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItemList;