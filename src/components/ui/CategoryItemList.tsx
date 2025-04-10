import React from 'react';
import Button from './Button';
import Input from './Input';
import { TCategory } from '../../../types/categoryType';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

interface CategoryItemListProps {
  categoryList: TCategory[];
  onDelete: (category: TCategory) => void;
  onEdit: (category: TCategory) => void;
  onComplete: () => void;
  className?: string;
}

const CategoryItemList: React.FC<CategoryItemListProps> = ({
  categoryList,
  onDelete,
  onEdit,
  onComplete,
  className,
}) => {
  return (
    <ul className={cn("w-full", className)}>
      {categoryList.map((category) => (
        <li
          key={category.id}
          className="mb-6 flex flex-row gap-4 items-center bg-gray-800 p-4 rounded-lg"
        >
          <Input type="checkbox" onChange={onComplete} className='w-5 h-5'/>
          <div>
            <p className="text-2xl">{category.title}</p>
          </div>
          <Button onClick={() => onEdit(category)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => onDelete(category)}>
            <DeleteOutlined />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryItemList;