import React from "react";

const HomeSkeleton = () => {
    return (
        <div className="flex justify-center gap-3 flex-wrap">
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    className="bg-[#282828] border border-[#3E3E3E] w-full lg:w-72 md:w-80 p-2"
                    key={index}
                >
                    <div className="w-full h-32 bg-[#3E3E3E]"></div>
                    <div className="w-full flex flex-col gap-2 justify-start items-start mt-2 font-prompt">
                        <div className="w-full flex flex-row flex-auto gap-2 justify-between items-center">
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
    );
};

export default HomeSkeleton;
