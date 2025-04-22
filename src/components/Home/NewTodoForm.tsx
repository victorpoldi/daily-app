import React, { ChangeEventHandler, FormEventHandler } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { TTodo } from '../../../types/todoType';
import { TCategory } from '../../../types/categoryType';
import Select from '../ui/Select';
import { BaseOptionType } from 'antd/es/select';
import { DefaultOptionType } from 'antd/es/cascader';

interface NewTodoFormProps {
  onCancel: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChangeTitle: ChangeEventHandler<HTMLInputElement>;
  onChangeCategory: (
    value: unknown,
    option?:
      | BaseOptionType
      | DefaultOptionType
      | (BaseOptionType | DefaultOptionType)[]
      | undefined
  ) => void;
  onChangeTargetDate: ChangeEventHandler<HTMLInputElement>;
  categories: TCategory[];
  context: {
    todos: TTodo[];
    errorMessage: string | undefined;
    titleFormInput: string;
    categoryFormInput: string;
    completedFormInput: boolean;
    targetDateFormInput: string;
  };
  events:
    | { type: 'createNewTodo' }
    | { type: 'titleInputChanged'; value: string }
    | { type: 'categoryInputChanged'; value: string }
    | { type: 'completedInputChanged'; value: boolean }
    | { type: 'targetDateInputChanged'; value: string }
    | { type: 'submit' }
    | { type: 'cancel' }
    | { type: 'delete'; todo: TTodo }
    | { type: 'speedUp' };
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  context,
  categories,
  onCancel,
  onSubmit,
  onChangeTitle,
  onChangeCategory,
  onChangeTargetDate,
}) => {
  const categoryOptions = categories.map((category) => ({
    value: category.title,
    label: category.title,
  }));

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Title"
        required
        onChange={onChangeTitle}
      />
      <div className="flex gap-4">
        <Select
          options={categoryOptions}
          onChange={onChangeCategory}
          placeholder="Select Category"
        />
        <Input
          type="date"
          placeholder="Select Target Date"
          required
          onChange={onChangeTargetDate}
          className="min-w-32"
        />
      </div>
      <div className="flex gap-4">
        <Button type="button" onClick={onCancel} className="w-full">
          Cancel
        </Button>
        <Button
          disabled={
            context.titleFormInput === '' ||
            context.categoryFormInput === '' ||
            context.targetDateFormInput === ''
          }
          className="disabled:opacity-50 w-full"
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default NewTodoForm;
