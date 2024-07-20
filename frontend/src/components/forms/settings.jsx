import React, { useState } from "react";
import useUserInfoFromToken from "../../hooks/userinfo";
import api from "../../api/base/config";
import SelectBar from "../micro/selectionbar";

const Settings = () => {
    const user = useUserInfoFromToken();
    const [msg, setMsg] = useState();
    const [selectedImageName, setSelectedImageName] = useState("");
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
        setSelectedImageName(image.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a FormData object to send the file and other data
            const formDataToSend = new FormData();
            formDataToSend.append("userId", user.userId);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("image", formData.image);

            const response = await api.patch(
                "/update-profile",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for handling file uploads
                    },
                }
            );

            if (response.status === 200) {
                // Update was successful, you can handle success feedback here
                setMsg("Profile updated successfully!");
                console.log("Profile updated successfully");
                console.log("Profile", response.data);
                console.log("Profile", response.data.data.profilePicture);
                user.profile = response.data.data.profilePicture;
                console.log("user.profile: ", user.profile);
            } else {
                // Handle the case where the update fails
                console.error("Profile update failed");
            }
        } catch (error) {
            console.error("Error while updating profile:", error);
            setMsg(error.response?.data.message);
        }
    };

    return (
        <div className="w-auto mt-16 ml-0 md:ml-64 lg:ml-64 bg-[#282828] border border-[#3E3E3E] py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-xl font-semibold">Update Profile</h1>
                    <h3 className="text-sm font-medium">
                        Update your profile information
                    </h3>
                    {msg && <span className="text-red-500">{msg}</span>}
                </div>
                <div className="w-full">
                    <div className="relative w-full flex flex-col items-start mt-2">
                        <label className="text-sm" htmlFor="videoFile">
                            Select Profile
                        </label>
                        <div className="flex items-center justify-center w-full mt-2">
                            <label
                                for="imageFile"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p clasNames="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                    {selectedImageName != "" && (
                                        <SelectBar text={selectedImageName} />
                                    )}
                                </div>
                                <input
                                    id="imageFile"
                                    type="file"
                                    className="hidden"
                                    name="imageFile"
                                    accept="image"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
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
