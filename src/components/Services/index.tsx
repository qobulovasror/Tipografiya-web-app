import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";
import ServicesTitle from "./ServiceTitle";
import SingleService from "./SingleService";
import servicesData from "./servicesData";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";


const Features = () => {
  const [url, setUrl] = useState("");
  return (
    <>
      <section id="services" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <ServicesTitle
            title="Our services"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <SingleService key={service.id} service={service} setUrl={setUrl} />
            ))}
          </div>
          {/* <Dialog>

            <SelectTemplate url={url} />
          </Dialog> */}
        </div>
      </section>
    </>
  );
};

const SelectTemplate = ({ url }: { url: string }) => {
  const { theme } = useTheme();
  return (
    <>
      <DialogContent className={`${theme == "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <DialogHeader>
          <DialogTitle className="text-center">Select template</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around gap-4 py-4">
          <Link to={`${url}/blank`} className="flex flex-col gap-4 p-8 rounded border hover:cursor-pointer">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              Select blank
            </h3>
          </Link>
          <Link to={"/#templates"} className="flex flex-col gap-4 p-8 rounded border hover:cursor-pointer">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              Select template
            </h3>
          </Link>
        </div>
      </DialogContent>
    </>
  )
}

export default Features;
