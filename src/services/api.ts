import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/culinary`;

export const fetchAllRestaurants = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const fetchRestaurantById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response;
};

export const searchRestaurantByName = async (
  name: string,
  lat?: number,
  lon?: number
) => {
  const params = new URLSearchParams({ name });
  if (lat && lon) {
    params.append("lat", lat.toString());
    params.append("lon", lon.toString());
  }
  const response = await axios.get(`${API_BASE_URL}/search?${params}`);
  return response.data;
};

export const fetchRecommendations = async (lat: number, lon: number) => {
  const response = await axios.get(`${API_BASE_URL}/recommendations`, {
    params: { lat, lon },
  });
  return response.data;
};
