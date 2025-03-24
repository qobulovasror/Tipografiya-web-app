import { Template } from "@/types/template";

const SingleTemplate = ({ template }: { template: Template }) => {
  // const { title, img, paragraph, author, tags, publishDate } = template;
  const { title, img, about, category, link } = template;
  return (
    <>
      <div
        className="wow fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-black/10 shadow-one duration-300 dark:bg-black/10 hover:dark:bg-black/20"
        data-wow-delay=".1s"
      >
        <a
          href={link}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold capitalize text-white">
            {category}
          </span>
          <img src={img} alt="img" className="h-full w-full object-cover" />
        </a>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <a
              href={link}
              className="mb-4 block text-xl font-bold text-body-color dark:border-white sm:text-2xl "
            >
              {title}
            </a>
          </h3>
          <p className="border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {about}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleTemplate;
