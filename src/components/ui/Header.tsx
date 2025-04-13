'use client'

import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import Button from "./Button";
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "antd";

type THeaderProps = {
  className?: string;
};


export const Header: React.FC<THeaderProps> = ({className}) => {
  return (
    <header className="w-full flex items-center justify-between bg-gray-700 p-2 rounded-lg">
      <Button
        className={cn(className, "p-0 h-10 w-10")}
        onClick={() => window.history.back()}
      >
        <ArrowLeftOutlined />
      </Button>
      <h1>TODO LIST</h1>
      <Avatar icon={<UserOutlined/>} size={32} style={{backgroundColor: '#d1d5dc'}}/>
    </header>
  );
};
