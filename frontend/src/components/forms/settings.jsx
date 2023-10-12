import React, { useState } from 'react';
import useUserInfoFromToken from '../../hooks/userinfo';
import api from '../../api/base/config';

const Settings = () => {
  const user = useUserInfoFromToken();
  const [msg, setMsg] = useState();
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setFormData({
      ...formData,
      image: image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send the file and other data
      const formDataToSend = new FormData();
      formDataToSend.append('userId', user.userId);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image);

      const response = await api.patch('/update-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for handling file uploads
        },
      });

      if (response.status === 200) {
        // Update was successful, you can handle success feedback here
        setMsg('Profile updated successfully!');
        console.log('Profile updated successfully');
        console.log("Profile", response.data)
        console.log("Profile", response.data.data.profilePicture)
        user.profile = response.data.data.profilePicture;
        console.log("user.profile: ", user.profile);
      } else {
        // Handle the case where the update fails
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error while updating profile:', error);
      setMsg(error.response?.data.message);
    }
  };

  return (
    <div className="w-auto mt-16 ml-0 md:ml-64 lg:ml-64 bg-[#282828] border border-[#3E3E3E] py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-semibold">Update Profile</h1>
          <h3 className="text-sm font-medium">Update your profile information</h3>
          {msg && <span className="text-red-500">{msg}</span>}
        </div>
        <div className="w-full">
          <div className="flex">
            <input type="file" name="image" id="image" onChange={handleImageChange} />
          </div>
          <div className="flex justify-center item-center gap-12">
            <div className="relative w-full flex flex-col items-start mt-2">
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <input
                className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                type="text"
                name="username"
                id="username"
                defaultValue={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full flex flex-col items-start mt-2">
              <label className="text-sm" htmlFor="name">
                Name
              </label>
              <input
                className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder={formData.name}
                defaultValue={user.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bg-red-500 flex text-white font-normal justify-center items-center w-full text-sm px-2 py-2.5 mt-4 rounded-sm">
            <button className="w-full" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
