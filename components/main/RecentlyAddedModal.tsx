import React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecentlyAddedItem {
  image: string;
  name: string;
  description: string;
  link: string;
}

interface RecentlyAddedModalProps {
  onClose: () => void;
  recentlyAddedItems: RecentlyAddedItem[];
}

const RecentlyAddedModal: React.FC<RecentlyAddedModalProps> = ({
  onClose,
  recentlyAddedItems,
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
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-[#31313140] backdrop-blur-[6.8px] p-6 rounded-lg lg:w-[50%] max-w-[60%] lg:h-[50vh] h-[58vh] max-h-[90vh] transform translate-x-[110px]"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
        <div className="flex-grow flex items-center justify-center">
          <div className="relative flex items-center w-full justify-center">
            <Carousel className="w-full max-w-[88%] relative">
              <CarouselContent>
                {recentlyAddedItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="bg-white bg-opacity-80 h-64 overflow-y-auto">
                        <CardContent className="flex flex-col items-center pt-4">
                          <div className="flex flex-row justify-start items-center w-full gap-3 pb-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="object-cover rounded-md w-16 h-16"
                            />
                            <span className="py-3">
                              <h3 className="text-black text-lg font-semibold my-1">
                                {item.name}
                              </h3>
                            </span>
                          </div>
                          <p className="text-base text-black mb-4 line-clamp-3">
                            {item.description}
                          </p>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:absolute lg:bottom-4 text-blue-500 hover:underline"
                          >
                            <p className="text-lg">Link</p>
                          </a>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10" />
              <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>
        <div className="lg:mt-4 pt-2">
          <button
            onClick={onClose}
            className="lg:absolute lg:bottom-4 lg:right-4 flex items-center justify-center text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedModal;
