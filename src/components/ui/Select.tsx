import React from 'react';
import { Select as SelectAntd } from 'antd';
import type { SelectProps as SelectPropsAntd } from 'antd';
import classNames from 'classnames';
import { DownOutlined } from '@ant-design/icons';

const Select: React.FC<SelectPropsAntd> = ({ ...props }) => {
  return (
      <SelectAntd
        className={classNames("custom-select-selector", "w-60 h-auto! bg-gray-700 p-2 rounded hover:bg-gray-400 hover:text-gray-900 border-none")}
        dropdownStyle={{ backgroundColor: '#99a1af' }}
        suffixIcon={<DownOutlined style={{ color: '#99a1af' }} />}
        {...props}
      />
  );
};

export default Select;
