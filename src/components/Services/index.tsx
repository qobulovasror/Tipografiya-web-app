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


const Features = () => {
  return (
    <>
      <section id="services" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <ServicesTitle
            title="Our services"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />

          <Dialog>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service) => (
                <SingleService key={service.id} service={service} />
              ))}
            </div>

            <SelectTemplate />
          </Dialog>
        </div>
      </section>
    </>
  );
};

const SelectTemplate = () => {
  const theme = useTheme();
  return (
    <>

      <DialogContent className={`${theme.theme=="dark"? "bg-gray-800": "bg-gray-200"}  w-full`}>
        <DialogHeader>
          <DialogTitle className="text-center">Select template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
      </DialogContent>
    </>
  )
}

export default Features;
