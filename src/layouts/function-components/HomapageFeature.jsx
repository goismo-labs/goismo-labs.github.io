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
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        dir="ltr"
        className="w-full"
      >
        {feature_list.map((item, i) => {
          const IconName = humanize(item.icon);
          const FeatherIcon = Icon[IconName];

          return (
            <SwiperSlide key={i}>
              <div
                className="flex flex-col md:flex-row items-center bg-white p-4 sm:p-10 rounded-2xl shadow-2xl gap-8 md:gap-14 min-h-[400px]"
                dir="ltr"
                // style={{border:"1px solid #FC987B"}}
              >
                {/* Left Column */}
                <div className="w-full md:w-1/2 space-y-5 text-left">
                  <div className="flex items-center gap-4">
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
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-w-[300px] sm:max-w-sm md:max-w-md object-contain rounded-lg"
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
