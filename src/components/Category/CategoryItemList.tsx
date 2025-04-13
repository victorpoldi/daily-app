import React from 'react';
import Button from '../ui/Button';
import { TCategory } from '../../../types/categoryType';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

interface CategoryItemListProps {
  categoryList: TCategory[];
  onDelete: (category: TCategory) => void;
  onEdit: (category: TCategory) => void;
  className?: string;
}

const CategoryItemList: React.FC<CategoryItemListProps> = ({
  categoryList,
  onDelete,
  onEdit,
  className,
}) => {
  return (
    <ul className={cn("w-full", className)}>
      {categoryList.map((category) => (
        <li
          key={category.id}
          className="mb-4 flex flex-row gap-4 items-center bg-gray-800 p-4 rounded-lg"
        >
          <div>
            <p className="text-2xl">{category.title}</p>
          </div>
          <Button className='ml-auto' onClick={() => onEdit(category)}>
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