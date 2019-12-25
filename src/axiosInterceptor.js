import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: "http://ec2-13-58-162-228.us-east-2.compute.amazonaws.com/api/v1"
});

axiosInterceptor.defaults.headers.common["Content-Type"] = "application/json";

axiosInterceptor.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return error;
  }
);

axiosInterceptor.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error;
  }
);

export default axiosInterceptor;
