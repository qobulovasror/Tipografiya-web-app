import { Services } from "@/types/services";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const SingleFeature = ({ service }: { service: Services }) => {
  const { icon, title, paragraph } = service;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-body-color dark:text-body-color-dark sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
        <DialogTrigger asChild>
          <Button className="inline-block rounded-sm mt-4 h-12 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-blue-700/100 dark:hover:bg-blue-700/50">Go to use</Button>
        </DialogTrigger>
      </div>
    </div>
  );
};

export default SingleFeature;
