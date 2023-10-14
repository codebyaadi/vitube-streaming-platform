import React from "react";

const VideoPageSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-col lg:flex-row justify-between">
            <div className="flex flex-col w-full md:w-full lg:w-[70%] font-prompt">
                <div className="rounded w-full overflow-hidden">
                    <div className="w-full h-48 md:h-72 lg:h-96 bg-[#3E3E3E]"></div>
                </div>
                <div className="flex flex-col gap-2 justify-start mt-4">
                    <h2 className="flex-1 text-xl font-medium line-clamp-2">
                        <div className="w-full h-8 bg-[#3E3E3E]"></div>
                    </h2>
                    <div className="flex flex-row justify-between items-center">
                        <div
                            id="user-info"
                            className="flex justify-start content-center items-center"
                        >
                            <div className="block">
                                <div
                                    className="bg-[#3E3E3E] w-10 h-10  rounded-full"
                                ></div>
                            </div>
                            <div className="h-10 flex flex-col justify-center ml-4 leading-none">
                                <div className="w-20 h-4" />
                                <div className="w-14 h-3" />
                            </div>
                        </div>
                        <div
                            id="action"
                            className="bg-[#282828] flex justify-between gap-4 rounded px-4 py-2.5 m-0 lg:mr-4"
                        >
                            <div className="bg-[#3E3E3E] w-6 h-6" />
                            <span className="border-r border-[#3E3E3E]"></span>
                            <div className="bg-[#3E3E3E] w-6 h-6" />
                        </div>
                    </div>
                    <div id="description" className="bg-[#282828] flex flex-col rounded p-2 my-2 m-0 lg:mr-4 mb-1">
                        <div className="w-full h-4" width={"100%"} height={16} style={{ minHeight: "16px" }} />
                        <div className="w-full h-24" width={"100%"} height={100} style={{ minHeight: "100px" }} />
                    </div>
                </div>
            </div>
            <div id="suggest-video" className="flex flex-col md:flex-row lg:flex-col gap-2 flex-wrap justify-center my-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className="bg-[#282828] border border-[#3E3E3E] w-full lg:w-72 md:w-80 p-2" key={index}>
                        <div className="w-full h-32 bg-[#3E3E3E]"></div>
                        <div className="w-full flex flex-col gap-2 justify-start items-start mt-2 font-prompt">
                            <div className="flex flex-row flex-auto gap-2 justify-between items-center">
                                <div className="bg-[#3E3E3E]  flex-shrink-0 rounded-full object-cover w-10 h-10"></div>
                                <div className="bg-[#3E3E3E] flex-1 rounded-sm w-full h-8"></div>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="rounded-sm bg-[#3E3E3E] w-14 h-3"></div>
                                <div className="rounded-sm bg-[#3E3E3E] w-14 h-3"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoPageSkeleton;