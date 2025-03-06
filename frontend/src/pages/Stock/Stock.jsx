import React, { useEffect } from "react";
import { Button, Flex, Space, Typography } from "antd";
import { useStock } from "../../Context/StockContext";
import { PlusOutlined } from "@ant-design/icons";
import CreateStock from "./CreateStock";
import StockTable from "./StockTable";

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
          onClick={() => setStockModel(true)}
        >
          Add
        </Button>
      </Flex>
      <StockTable />
      <CreateStock />
    </Space>
  );
};

export default Stock;
