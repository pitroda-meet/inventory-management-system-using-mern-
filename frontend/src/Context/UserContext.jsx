import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize userData directly from localStorage
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userLoading, setUserLoading] = useState(false);
  const [users, setusers] = useState([]);
  const [isUserModel, setisUserModel] = useState(false);

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const createUser = async (user) => {
    setUserLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/createuser`,
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.user) {
        setusers((prev) => [...prev, response.data.user]);
        toast.success(response.data.message);
        setisUserModel(false);
        await getAllUser();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating user");
      setisUserModel(false);
    } finally {
      setUserLoading(false);
    }
  };

  const getAllUser = async () => {
    setUserLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getalluser`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data) {
        setusers(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      setUserLoading(false);
    }
  };

  const LoginUser = async (data, navigate) => {
    setUserLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/loginuser`,
        data,

        { withCredentials: true }
      );

      if (response.data) {
        setUserData(response.data);
        saveUserToLocalStorage(response.data);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setUserLoading(false);
    }
  };

  const updateroll = async (id, role) => {
    setUserLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updateuser/${id}`,
        { role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      await getAllUser();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating user role");
    } finally {
      setUserLoading(false);
    }
  };

  const deleteuser = async (id) => {
    setUserLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/deleteuser/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      await getAllUser();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Error deleting user");
    } finally {
      setUserLoading(false);
    }
  };

  const logoutUser = async (navigate) => {
    setUserLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      removeUserFromLocalStorage();
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setUserLoading(false);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllUser();
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        users,
        createUser,
        LoginUser,
        logoutUser,
        userLoading,
        getAllUser,
        isUserModel,
        setisUserModel,
        updateroll,
        setusers,
        deleteuser,
        // Removed loadUserFromLocalStorage from the context value
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
