import axios from "axios";

export default async () => {
  const res = await axios({
    method: "GET",
    url: "/api/v1/config/global",
  });
  return res.data.data;
};
