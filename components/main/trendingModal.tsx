import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { useEffect, useRef } from "react";

interface TrendingModalProps {
  trendingSearches: string[];
  onClose: () => void;
  onQueryClick: (query: string) => void;
}

const TrendingModal: React.FC<TrendingModalProps> = ({
  trendingSearches,
  onClose,
  onQueryClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // To close modal when user click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="flex flex-col bg-[#31313140] backdrop-blur-[6.8px] p-6 rounded-lg w-[80%] max-w-3xl h-[40vh] max-h-[80vh] transform translate-x-[110px]"
        ref={modalRef}
      >
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <ul className="flex flex-row flex-wrap gap-3">
          {trendingSearches.map((search, index) => (
            <div className="bg-transparent bg-opacity-50 border-[1px] hover:scale-105 hover:shadow-lg rounded border-slate-500 shadow-sm shadow-slate-500 transform transition-all duration-150 ease-in-out">
              <li
                key={index}
                className="p-2 flex flex-row gap-2 cursor-pointer"
                onClick={() => onQueryClick(search)}
              >
                <IoIosTrendingUp className="text-xl pt-1" />
                {search}
              </li>
            </div>
          ))}
        </ul>
        <button
          className="absolute bottom-4 right-4 mt-4 p-2 bg-red-600 text-white rounded w-[10%]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TrendingModal;
