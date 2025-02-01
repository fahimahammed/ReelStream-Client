import axios from "axios";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

// register user
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/auth/register`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data;
  } catch (error: any) {
    // Handle API errors
    throw new Error(error.response?.data?.message || "Register failed");
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/auth/login`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Extract response data
    const result = res.data;

    if (result.success) {
      // Store token in localStorage
      localStorage.setItem("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    // Handle API errors
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// logout user
export const logout = () => {
  localStorage.removeItem("accessToken");
};

// get logged in user info
export const getCurrentUser = () => {
  const accessToken = localStorage.getItem("accessToken");
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken);

    return decodedData;
  } else {
    return null;
  }
};


// get all Videos
export const getMyProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res; // Return API response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Profile");
  }
};