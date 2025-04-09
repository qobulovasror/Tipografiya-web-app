import ServicesTitle from "./ServiceTitle";
import SingleService from "./SingleService";
import servicesData from "./servicesData";

const Features = () => {
  return (
    <>
      <section id="services" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <ServicesTitle
            title="Bizning xizmatlarimiz"
            paragraph="Biz sizga quyidagi xizmatlarni taqdim etamiz. Sizga mos xizmatni tanlang va uni o'zingiz uchun moslang. Xizmatlardan foydalanish tekin va istalgan vaqtda foydalanishingiz mumkin."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <SingleService key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
