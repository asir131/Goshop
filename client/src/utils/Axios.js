// import axios from "axios";

// import SummaryApi, { baseURL } from "../common/SummaryApi";
// const Axios = axios.create({
//     baseURL: baseURL,
//     withCredentials: true
// })


// //sending access token in the header
// Axios.interceptors.request.use(async(config) => {
//     const accessToken = localStorage.getItem('accessToken')
//     if(accessToken){
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
// },
// (error)=>{
//     return Promise.reject(error)
// }
// )

// //extend the life span of access token with the help of refresh token
// Axios.interceptors.request.use(
//     (response)=>{
//         return response
//     },
//     async(error)=>{
//         let originRequest = error.config

//         if(error.response.status === 401 && !originRequest.retry){
//             originRequest.retry=true

//             const refreshToken = localStorage.getItem("refreshToken")

//             if(refreshToken){
//                 const newAccessToken = await refreshAccessToken(refreshToken)

//                 if(newAccessToken){
//                     originRequest.header.Authorization = `Bearer ${newAccessToken}`
//                     return Axios(originRequest)
//                 }
//             }
//         }
//         return Promise.reject(error)
//     }
// )

// const refreshAccessToken = async(refreshToken)=>{
//     try {
//         const response = await Axios({
//             ...SummaryApi.refreshToken,
//             headers : {
//                 Authorization : `Bearer ${refreshToken}`
//             }
//         })
//         const accessToken = response.data.data.accessToken
//         localStorage.setItem('accessToken',accessToken)
//         return accessToken
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }
// export default Axios

import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// ✅ 1. Add access token to request headers
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 2. Handle 401 error and refresh token
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          // 🔄 Retry original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

// ✅ 3. Refresh token request
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};

export default Axios;
