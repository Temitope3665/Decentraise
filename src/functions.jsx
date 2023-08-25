/* eslint-disable no-undef */
import axios from "axios";
import { toaster } from "evergreen-ui";

const cloudaryUpload = async (payload, setCurrentProgress) => axios({
    method: 'POST',
    url: `${process.env.VITE_REACT_APP_CLOUDINARY_BASEURL}`,
    data: payload,
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setCurrentProgress(percentCompleted);
    },
  });

export const uploadImage = (formData, setCurrentProgress) => {
    try {
      return cloudaryUpload(formData, setCurrentProgress)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
            toaster.danger(error?.response?.data?.error?.message, { id: 'mess' });
        })
    } catch (error) {
        toaster.danger(error?.response?.data?.error?.message, { id: 'mess' });
    }
  };

export const handleUploadImage = (file, setCurrentProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset', `${process.env.VITE_REACT_APP_CLOUDINARY_PRESET}`,
    );
    return uploadImage(formData, setCurrentProgress);
  };