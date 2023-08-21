import ReactPlayer from "react-player";
import useMovie from "../hooks/useMovie";
import { useEffect } from "react";

const VideoPlayerModal = () => {
  const { showModal, closeModal, modalData } = useMovie();
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div
      className={`flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md scale-0 ${
        showModal && "scale-100"
      } transition-all`}
      onClick={closeModal}
    >
      <div
        className="relative w-2/4 mx-auto bg-slate-700 rounded-md p-5 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" font-semibold font-serif self-start">
          {modalData?.name}
        </div>
        <div
          className="absolute top-1 right-1 cursor-pointer border border-white rounded-full w-4 h-4 flex justify-center items-center pb-[0.20rem]"
          onClick={closeModal}
        >
          x
        </div>
        {modalData ? (
          modalData?.id ? (
            <ReactPlayer
              url={`https://youtu.be/${modalData?.id}`}
              width={"100%"}
              playing
              controls
            />
          ) : (
            <div className="flex justify-center items-center flex-col animate-pulse ">
              <div>Video Unavailable</div>
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
            </div>
          )
        ) : (
          <div className=" w-full flex items-center justify-center h-52 bg-gray-600 relative overflow-hidden">
            <div className="absolute inset-0 via-rose-100/20 from-transparent to-transparent bg-gradient-to-r animate-shimmer -translate-x-full"></div>
            <svg
              className="w-10 h-10 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerModal;
