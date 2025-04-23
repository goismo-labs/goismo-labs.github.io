import { useEffect, useState } from "react";
import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
import "./HomepageTab.css";

const HomepageTab = ({ homepage_tab: { tab_list, title, description } }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to update activeIndex
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".homepage-tab-section");
      let index = 0;
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          index = i;
        }
      });
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Cloud-style Quote Section */}
      {/* Quote Section */}
      <div className="flex justify-center px-6 pt-12 pb-8 bg-gradient-to-br from-blue-100 to-white">
        <div className="relative max-w-3xl w-full bg-white/80 rounded-[60px] p-8 shadow-xl border border-blue-100">
          <blockquote className="text-center italic text-gray-700 text-lg lg:text-xl">
            <span className="block before:content-['“'] after:content-['”'] text-orange-600">
              {description}
            </span>
            <footer className="mt-3 text-sm text-gray-500">
              — Jodi Rell, former governor of Connecticut
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Decorative Divider */}
      <hr className="border-t-2 border-orange-300 mx-8 lg:mx-24 my-6" />
      {/* Title Section */}
      <div className="text-center pt-6 pb-12 px-4 bg-white">
        <div className="inline-block border-l-4 border-orange-500 pl-4">
          <h1 className="text-3xl lg:text-3.5xl font-bold tracking-tight text-gray-800">
            {title}
          </h1>
        </div>
      </div>

      {/* Snap Scroll Sections */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Text Sections */}
        <div className="lg:w-1/2 w-full flex flex-col justify-between min-h-screen space-y-8 px-6 pb-12">
          {tab_list.map((item, index) => {
            const FeatherIcon = Icon[humanize(item.icon)];
            return (
              <section
                key={index}
                className={`homepage-tab-section snap-start min-h-screen flex items-center transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-10"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <FeatherIcon className="text-orange-500 w-6 h-6" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.list && (
                    <ul className="list-disc list-inside text-gray-500 space-y-1">
                      {item.list.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Sticky Right Images */}
        <div className="lg:w-1/2 w-full hidden lg:flex items-center justify-center sticky top-0 h-screen">
          <div className="relative w-full h-screen flex items-center justify-center">
            {tab_list.map((item, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="aspect-[1/1] w-full max-w-fit mx-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageTab;
