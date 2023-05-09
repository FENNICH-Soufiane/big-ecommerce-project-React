import baseUrl from '../Api/baseURL'

// const useInsUpdateData = async (url, params) => {
//   const res = await baseUrl.put(url, params)
//   return res
// }


const useInsUpdateDataWithImage = async (url, parmas) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  const res = await baseUrl.put(url, parmas, config);
  console.log(res.status)
  return res;
}

const useInsUpdateData = async (url, parmas) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  const res = await baseUrl.put(url, parmas, config);
  return res;
}
export { useInsUpdateData, useInsUpdateDataWithImage }