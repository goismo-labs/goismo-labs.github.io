import { useState } from "react";
import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";

const HomepageTab = ({ homepage_tab: { tab_list, title, description } }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="tab gx-1 row items-center">
      {/* Images Section */}
      <div className="lg:col-7 lg:order-2">
        <div className="relative h-64 w-full flex items-center justify-center">
          {tab_list.map((item, index) => {
            const basePosition = {
              0: "-translate-x-20 z-10",
              1: "z-20",
              2: "translate-x-20 z-10",
            };

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out
            ${basePosition[index]} 
            ${
              activeIndex === index
                ? "scale-150 z-30"
                : activeIndex !== null
                  ? "scale-90 opacity-60"
                  : "scale-100"
            }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="aspect-[4/3] w-60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Text Section */}
      <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
        <div className="text-container w-full max-w-full pr-0">
          <h2 className="lg:text-4xl">{title}</h2>
          <p className="mt-4">{description}</p>
          <ul className="tab-nav mt-8 border-b-0">
            {tab_list.map((item, index) => {
              const FeatherIcon = Icon[humanize(item.icon)];
              return (
                <li
                  key={index}
                  className={`tab-nav-item flex items-center gap-2 py-2 px-3 rounded cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gray-100 scale-[1.03]"
                      : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <span className="tab-icon mr-3">
                    <FeatherIcon />
                  </span>
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomepageTab;
