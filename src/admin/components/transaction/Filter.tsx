import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Checkbox } from "@/Components/ui/checkbox";

const Filter = () => {
  const services = [
    {
      name: "Card Transfers",
    },
    {
      name: "Utility Payment",
    },
    {
      name: "Gift Cards",
    },
    {
      name: "Coins",
    },
  ];

  const status = [
    {
      name: "Unsuccessful",
    },
    {
      name: "Successful",
    },
  ];

  const dates = [
    {
      name: "Last 3 days",
    },
    {
      name: "This Month",
    },
    {
      name: "Last 3 months",
    },
  ];

  return (
    <div className="w-full py-2 rounded-md bg-white">
      <div className="flex flex-col">
        <h2 className="text-sm px-4 text-[#7901b1] font-semibold">Filter</h2>
        <span className="border-[0.5px] mx-3 border-[#D9D9D9]" />
        <Accordion type="multiple" defaultValue={["services"]} className="px-2">
          <AccordionItem value="services" className="border-b-0 mt-2">
            <AccordionTrigger className="font-semibold px-1.5 py-1.5 bg-[#FAFAFA] rounded-sm border border-[#f1f1f1]">
              Services
            </AccordionTrigger>
            <AccordionContent className="mt-2.5 pb-1">
              {services.map((service) => (
                <div className="flex flex-col my-1">
                  <div className="flex justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{service.name}</span>
                    <Checkbox />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="status" className="border-b-0 mt-1">
            <AccordionTrigger className="font-semibold px-1.5 py-1.5 bg-[#FAFAFA] rounded-sm border border-[#f1f1f1]">
              Status
            </AccordionTrigger>
            <AccordionContent className="mt-2.5 pb-1">
              {status.map((item) => (
                <div className="flex flex-col my-1">
                  <div className="flex justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{item.name}</span>
                    <Checkbox />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date" className="border-b-0 mt-1">
            <AccordionTrigger className="font-semibold px-1.5 py-1.5 bg-[#FAFAFA] rounded-sm border border-[#f1f1f1]">
              Date
            </AccordionTrigger>
            <AccordionContent className="mt-2.5 pb-1">
              {dates.map((date) => (
                <div className="flex flex-col my-1">
                  <div className="flex justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{date.name}</span>
                    <Checkbox />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
