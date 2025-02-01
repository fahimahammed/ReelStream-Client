import axios from "axios";

//upload reel video
export const uploadReel = async (data: FormData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Unauthorized: No access token found.");
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/video/upload`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        `Failed to upload reels: ${error.message}`
    );
  }
};

// get all reels
export const getAllReels = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API}/video/upload`,
      {
        params: { page, limit },
      }
    );
    return res.data; // Return API response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch reels");
  }
};

// get single reel by id
export const getReelById = async (reelId: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API}/video/upload/${reelId}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch reel");
  }
};

// handle like unlike
export const likeUnlike = async (reelId: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Unauthorized: No access token found.");
    }

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/video/upload/${reelId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to like/unlike reel."
    );
  }
};
