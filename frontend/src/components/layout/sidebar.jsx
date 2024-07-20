import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookies";
import useUserInfoFromToken from "../../hooks/userinfo";
import { X } from "lucide-react";

const Sidebar = ({ profile, name, username, isOpen, setIsOpen, visible }) => {
    const user = useUserInfoFromToken();
    const navigate = useNavigate();
    const handleUploadClick = () => {
        // Close the sidebar by setting isOpen to false
        setIsOpen(false);
        // Navigate to the desired route
        navigate(`/dashboard/${user.userId}/upload`);
    };
    // Function to handle logout
    const handleLogout = () => {
        // Clear the token or perform any other necessary logout actions
        Cookies.removeItem("token", { secure: true, sameSite: "None" });
        navigate("/");
        window.location.reload();
    };
    return (
        <aside
            className={`transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 lg:translate-x-0 duration-300 md:${visible} lg:${visible} fixed top-0 left-0 z-10 md:z-0 lg:z-0 h-screen bg-[#282828] w-64 border-r border-[#3E3E3E] pt-24`}
        >
            <button
                className="block md:block lg:hidden absolute top-8 right-4"
                onClick={() => setIsOpen(false)}
            >
                <X />
            </button>
            <div
                className="flex flex-col justify-center items-center"
                id="profile"
            >
                <img
                    src={profile}
                    alt="Profile Photo"
                    className="rounded-full w-28 h-28 object-cover"
                />
                <div
                    className="flex flex-col justify-center items-center mt-4"
                    id="profile-basic-details"
                >
                    <h2 className="font-prompt text-base">{name}</h2>
                    <p className="font-prompt text-sm text-white/60">
                        @{username}
                    </p>
                </div>
            </div>
            <div
                id="menus"
                className="w-full flex flex-col font-prompt text-base px-3 my-3"
            >
                <button
                    className="bg-red-500 rounded-sm text-sm text-center px-3 py-2"
                    onClick={handleUploadClick}
                >
                    Upload
                </button>
            </div>
            <div
                id="bottom-menus"
                className="w-full flex flex-col absolute bottom-0 font-prompt text-base border-t border-[#3E3E3E] px-3"
            >
                <Link
                    to={`/dashboard/${user.userId}/settings`}
                    onClick={() => setIsOpen(false)}
                    className="border-b border-[#3E3E3E] py-3"
                >
                    Setting
                </Link>
                <button onClick={handleLogout} className="text-start py-3">
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
