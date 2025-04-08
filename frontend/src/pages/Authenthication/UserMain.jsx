import React, { useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import UserTable from "./UserTable";
import { Button, Flex, Space } from "antd";
import Title from "antd/es/skeleton/Title";
import { PlusOutlined } from "@ant-design/icons";
import UserAdd from "./UserAdd";

const UserMain = () => {
  const { users, getAllUser, userLoading, isUserModel, setisUserModel } =
    useUser();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="space-between">
        <Title level={2}>user</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setisUserModel(true)}
        >
          Add
        </Button>
      </Flex>
      <UserTable />
      <UserAdd />
    </Space>
  );
};

export default UserMain;
