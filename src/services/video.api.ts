import axios from "axios";

//upload Video video
export const uploadVideo = async (data: FormData) => {
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
      `Failed to upload Videos: ${error.message}`
    );
  }
};

// get all Videos
export const getAllVideos = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API}/video/`,
      {
        params: { page, limit },
      }
    );
    return res; // Return API response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Videos");
  }
};

// get single Video by id
export const getVideoById = async (VideoId: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API}/video/upload/${VideoId}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Video");
  }
};

// handle like unlike
export const likeUnlike = async (VideoId: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Unauthorized: No access token found.");
    }

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/video/upload/${VideoId}`,
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
      error.response?.data?.message || "Failed to like/unlike Video."
    );
  }
};
