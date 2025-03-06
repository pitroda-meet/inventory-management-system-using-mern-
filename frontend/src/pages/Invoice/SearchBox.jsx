import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="relative ">
      <Input
        placeholder="Search opportunities..."
        prefix={<SearchOutlined className="text-gray-400" />}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
