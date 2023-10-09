import React, { useState } from 'react';
import useUserInfoFromToken from '../../hooks/userinfo';
import axios from 'axios'; // Import Axios

const Settings = () => {
  const user = useUserInfoFromToken();
  const [msg, setMsg] = useState();
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch('http://localhost:8080/api/v1/update-profile', {
        userId: user.userId,
        username: formData.username,
        name: formData.name,
      });

      if (response.status === 200) {
        // Update was successful, you can handle success feedback here
        setMsg("Profile updated successfull!")
        console.log('Profile updated successfully');
      } else {
        // Handle the case where the update fails
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error while updating profile:', error);
      setMsg(error.response?.data.message)
    }
  };

  return (
    <div className="w-auto mt-16 ml-64 bg-[#282828] border border-[#3E3E3E] py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-semibold">Update Profile</h1>
          <h3 className="text-sm font-medium">Update your profile information</h3>
          {msg && <span className="text-red-500">{msg}</span>}
        </div>
        <div className="w-full">
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
                value={formData.username}
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
                value={formData.name}
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
