import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="mt-16 px-2 sm:px-6 md:px-6 xl:px-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {feature_list.map((item, i) => {
          const IconName = humanize(item.icon);
          const FeatherIcon = Icon[IconName];

          return (
            <SwiperSlide
              key={i}
              className={`
              !w-[90%] sm:!w-[70%] md:!w-[60%] 
              transition-all duration-300 ease-in-out swiper-slide
            `}
            >
              <div
                className={`
                feature-card 
                flex flex-col md:flex-row items-center 
                p-4 sm:p-10 rounded-2xl shadow-2xl gap-8 md:gap-14 min-h-[400px] 
                transition-all duration-500 ease-in-out h-full
              `}
              >
                {/* Left Column */}
                <div className="w-full md:w-1/2 space-y-5 text-left">
                  <div className="flex items-start gap-4">
                    {FeatherIcon && (
                      <div className="bg-orange-100 p-3 rounded-full shadow-md">
                        <FeatherIcon className="w-8 h-8 text-[#FC987B]" />
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 flex items-stretch justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full max-h-[400px] w-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomapageFeature;
