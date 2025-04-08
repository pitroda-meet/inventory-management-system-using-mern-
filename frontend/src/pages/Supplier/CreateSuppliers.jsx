import { Form, Spin } from "antd";
import { useSupplier } from "../../Context/SupplierContext";
import SupplierForm from "../../Component/SupplierForm";
import axios from "axios";
import { toast } from "react-toastify";

const CreateSuppliers = () => {
  const {
    fetchsupplier,
    isLoadSupplier,
    setIsLoadSupplier,
    SuppliersModel,
    setSuppliersModel,
  } = useSupplier();

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setIsLoadSupplier(true); // Show spinner on submit
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/supplier/uploadsupplier`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (
        response.data &&
        (response.status === 200 || response.status === 201)
      ) {
        toast.success(response.data.message);
        fetchsupplier();
        setSuppliersModel({ open: false, supplier: null });

        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setSuppliersModel({ open: false, supplier: null });
      } else {
        toast.error("An error occurred while creating the supplier.");
      }
    } finally {
      setIsLoadSupplier(false); // Hide spinner after request
    }
  };

  return (
    <Spin spinning={isLoadSupplier}>
      <SupplierForm
        open={SuppliersModel.open && !SuppliersModel.supplier}
        onSubmit={handleSubmit}
        form={form}
        suppliers={null}
        onClose={() => setSuppliersModel({ open: false, supplier: null })}
      />
    </Spin>
  );
};

export default CreateSuppliers;
