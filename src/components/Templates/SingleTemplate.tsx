import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Template } from "@/types/template";
import { Link } from "react-router-dom";
import { category, categoryEnglish } from "./templatesData";

const SingleTemplate = ({ template }: { template: Template }) => {
  const { img, id, type } = template;
  
  return (
    <>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-2xl dark:hover:shadow-gray-800 py-0">
        <a href={"/create-visit-card/" + id} className="relative block">
          <AspectRatio ratio={37 / 22} className="overflow-hidden rounded-t-lg">
            <img
              src={"/templates/templateImg/" + img}
              alt={"card img"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          <Badge className="absolute right-4 top-4 z-20 px-4 py-2 text-sm font-semibold bg-blue-500 capitalize shadow-md">
            {category[categoryEnglish.indexOf(type)]}
          </Badge>
          <Link to={"/create-visit-card/" + id} className="absolute bottom-1 right-1 z-10 bg-green-500 px-3 py-2 rounded">Foydanalish</Link>
        </a>
      </Card>
    </>
  );
};






export default SingleTemplate;
