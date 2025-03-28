import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Template } from "@/types/template";

const SingleTemplate = ({ template }: { template: Template }) => {
  const { title, img, about, category, link } = template;
  return (
    <>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-2xl dark:hover:shadow-gray-800">
        <a href={link} className="relative block">
          <AspectRatio ratio={37 / 22} className="overflow-hidden rounded-t-lg">
            <img
              src={img}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          <Badge className="absolute right-4 top-4 z-20 px-4 py-2 text-sm font-semibold bg-blue-500 capitalize shadow-md">
            {category}
          </Badge>
        </a>
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-bold sm:text-2xl">
            <a href={link} className="dark:text-body-color-dark hover:underline text-body-color">
              {title}
            </a>
          </h3>
          <p className="mt-4 text-sm text-gray-800 dark:text-gray-400">{about}</p>
        </CardContent>
      </Card>
    </>
  );
};






export default SingleTemplate;
