import axios from "axios";

export const getAnalytics = async (query?: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Unauthorized: No access token found.");
    }

    const url = query
      ? `${import.meta.env.VITE_BASE_API}/analytics?${query}`
      : `${import.meta.env.VITE_BASE_API}/analytics`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching analytics:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch analytics data."
    );
  }
};
