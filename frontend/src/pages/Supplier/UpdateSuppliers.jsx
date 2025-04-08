import { Form } from "antd";
import { useSupplier } from "../../Context/SupplierContext";
import SupplierForm from "../../Component/SupplierForm";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";
import axios from "axios";
const UpdateSuppliers = () => {
  const {
    suppliers,
    fetchsupplier,
    isLoadSupplier,
    setIsLoadSupplier,
    SuppliersModel,
    setSuppliersModel,
  } = useSupplier();
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    if (!SuppliersModel?.supplier?._id) {
      toast.error("No supplier selected for update");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/supplier/update/${
          SuppliersModel.supplier._id
        }`,
        values,
        { withCredentials: true }
      );

      toast.success(response.data.message || "Supplier updated successfully");
      setSuppliersModel({ open: false, supplier: null });
      fetchsupplier();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while updating"
      );
      setSuppliersModel({ open: false, supplier: null });
    } finally {
      form.resetFields();
    }
  };

  return (
    <SupplierForm
      open={SuppliersModel.open && SuppliersModel.supplier}
      onSubmit={handleSubmit}
      form={form}
      supplier={SuppliersModel.supplier}
      onClose={() => setSuppliersModel({ open: false, supplier: null })}
    />
  );
};

export default UpdateSuppliers;
