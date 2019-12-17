import axios from "axios";

function axiosWithAuth() {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://carpoolbackend.herokuapp.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
}

function AxiosWithoutAuth() {}

export { axiosWithAuth, AxiosWithoutAuth };
