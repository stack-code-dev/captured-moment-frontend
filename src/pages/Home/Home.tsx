import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navabar } from "../../components/Navabar";

export const Home = () => {
  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user) {
        console.log(response.data)
        setUserInfo(response.data)
      }
    } catch (error){
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          localStorage.clear()
          navigate("/login")
        }
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])

  return (
    <Navabar />
  );
}
