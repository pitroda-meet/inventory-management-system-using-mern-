import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [users, setusers] = useState([]);
  const [isUserModel, setisUserModel] = useState(false);
  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const loadUserFromLocalStorage = () => {
    setUserLoading(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    setUserLoading(false);
  };

  const createUser = async (user) => {
    setUserLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/createuser",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.user) {
        setusers((prevuser) => [...prevuser, response.data.user]);
        toast.success(response.data.message);
        setisUserModel(false);
        getAllUser();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating user");
    } finally {
      setUserLoading(false);
    }
  };

  //  getalluser

  const getAllUser = async () => {
    setUserLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/getalluser`,
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
    } finally {
      setUserLoading(false);
    }
  };
  const LoginUser = async (data, navigate) => {
    setUserLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/loginuser",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
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
      toast.error("Login failed");
    } finally {
      setUserLoading(false);
    }
  };

  const updateroll = async (id, role) => {
    setUserLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/updateuser/${id}`,
        { role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data) {
        toast.success(response.data.message);
      }
      getAllUser();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteuser = async (id) => {
    setUserLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/deleteuser/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success(response.data.message);
        getAllUser(); // Refresh user list
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setUserLoading(false);
    }
  };

  const logoutUser = async (navigate) => {
    setUserLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true }
      );

      setUserData(null);
      removeUserFromLocalStorage();
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromLocalStorage();
    getAllUser();
  }, []);

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
        loadUserFromLocalStorage,
        updateroll,
        deleteuser,
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
