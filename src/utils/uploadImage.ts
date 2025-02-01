import { axiosInstance } from "../api/axiosInstance"

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  try{
    const resposne = await axiosInstance.post('image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return resposne.data
  } catch (error) {
    console.error('Error uploading the image', error)
  }
}

