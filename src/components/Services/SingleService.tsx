import { Services } from "@/types/services";
import { Link } from "react-router-dom";

const SingleFeature = ({ service }: { service: Services }) => {
  const { icon, title, paragraph, link } = service;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-body-color dark:text-body-color-dark sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="h-30 pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
        <div className="flex gap-4 items-end">
          <Link to={link} className="inline-block rounded-sm mt-4 p-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-blue-700/100 dark:hover:bg-blue-700/50">Foydanalish</Link>
          <a href="/#templates" className="inline-block rounded-sm mt-4 p-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 border dark:hover:bg-blue-700/50">Shablon tanlash</a>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
