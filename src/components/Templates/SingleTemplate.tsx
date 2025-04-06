import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Template } from "@/types/template";
import { Link } from "react-router-dom";

const SingleTemplate = ({ template }: { template: Template }) => {
  const { title, img, category, link } = template;
  return (
    <>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-2xl dark:hover:shadow-gray-800 py-0">
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
          <Link to={link} className="absolute bottom-1 right-1 z-10 bg-blue-500 px-3 py-2 rounded">Go to edit</Link>
        </a>
      </Card>
    </>
  );
};






export default SingleTemplate;
