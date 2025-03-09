import React, { useEffect } from "react";
import { Button, Flex, Space, Typography } from "antd";
import { useStock } from "../../Context/StockContext";
import { PlusOutlined } from "@ant-design/icons";
import CreateStock from "./CreateStock";
import StockTable from "./StockTable";
import UpdateStock from "./UpdateStock";

const { Title } = Typography;

const Stock = () => {
  const { stockModel, setStockModel, getAllStock } = useStock();
  useEffect(() => {
    getAllStock();
  }, []);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="space-between">
        <Title level={2}>Stock</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setStockModel({ open: true, stock: null })}
        >
          Add
        </Button>
      </Flex>
      <StockTable />
      <CreateStock />
      <UpdateStock />
    </Space>
  );
};

export default Stock;
