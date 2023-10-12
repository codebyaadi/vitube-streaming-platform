import axios from 'axios';

export const uploadVideo = async (video) => {
  const data = new FormData();
  data.append('file', video);
  data.append('upload_preset', 'my_video'); // Replace with your Cloudinary preset

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const resourceType = 'video';
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Uploading: ${percentCompleted}%`);
      },
    };

    const res = await axios.post(api, data, config);
    const { secure_url } = res.data;

    console.log(secure_url);
    return secure_url;
  } catch (error) {
    console.error(error);
  }
};
