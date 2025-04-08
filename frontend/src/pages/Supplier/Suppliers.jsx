import React, { useEffect } from "react";
import { Button, Flex, Space, Typography } from "antd";
import { useSupplier } from "../../Context/SupplierContext";
import { PlusOutlined } from "@ant-design/icons";
import SuppliersTable from "./SuppliersTable";
import CreateSuppliers from "./CreateSuppliers";
import UpdateSuppliers from "./UpdateSuppliers";

const { Title } = Typography;

const Suppliers = () => {
  const { fetchsupplier, setSuppliersModel } = useSupplier();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="space-between">
        <Title level={2}>Suppliers</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setSuppliersModel({ open: true, Suppliers: null })}
        >
          Add
        </Button>
      </Flex>
      <SuppliersTable />
      <CreateSuppliers />
      <UpdateSuppliers />
    </Space>
  );
};

export default Suppliers;
