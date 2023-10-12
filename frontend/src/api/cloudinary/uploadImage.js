import axios from "axios"

const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "my_image"); // Replace with your Cloudinary preset

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType = "image";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  export default uploadImage;