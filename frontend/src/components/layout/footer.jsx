import axios from "axios";
import { Github } from "lucide-react";
import React, { useEffect, useState } from "react";

const Footer = () => {
    const [stars, setStars] = useState();

    useEffect(() => {
        axios
            .get(
                "https://api.github.com/repos/codebyaadi/vitube-streaming-platform"
            )
            .then((response) => {
                const total_stars = response.data.stargazers_count;
                setStars(total_stars);
            });
    }, []);
    return (
        <footer className="bg-[#282828] w-full flex flex-row justify-between items-center static bottom-0 left-0 z-10 px-4 md:px-6 lg:px-10 py-4 border-b border-[#3E3E3E]">
            <div className="font-prompt font-light">
                Built by{" "}
                <a
                    target="_blank"
                    href="https://codebyaadi.netlify.app/"
                    className="font-medium"
                >
                    Aaditya.
                </a>
            </div>
            <a
                href="https://github.com/codebyaadi/vitube-streaming-platform"
                target="_blank"
                className="bg-[#1F1F1F] flex justify-center items-center px-3 py-2 rounded-sm"
            >
                <Github size={"16"} />
                <span className="ml-2 text-sm font-prompt">
                    {stars} GitHub Stars
                </span>
            </a>
        </footer>
    );
};

export default Footer;
