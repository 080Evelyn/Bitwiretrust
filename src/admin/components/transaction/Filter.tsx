import {
  datesConstant,
  servicesConstant,
  statusConstant,
} from "@/admin/constant/transactions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Checkbox } from "@/Components/ui/checkbox";

interface FilterProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const Filter = ({ searchParams, setSearchParams }: FilterProps) => {
  const toggleService = (name: string) => {
    const types = searchParams.getAll("transactionTypes");
    const newTypes = types.includes(name)
      ? types.filter((t) => t !== name)
      : [...types, name];

    searchParams.delete("transactionTypes");
    newTypes.forEach((t) => searchParams.append("transactionTypes", t));
    setSearchParams(searchParams);
  };

  const toggleStatus = (id: string) => {
    if (searchParams.get("status") === id) {
      searchParams.delete("status");
    } else {
      searchParams.set("status", id);
    }
    setSearchParams(searchParams);
  };

  const toggleDate = (preset: string) => {
    const now = new Date();
    let fromDate: Date | null = null;

    if (preset === "Last 3 days") {
      fromDate = new Date();
      fromDate.setDate(now.getDate() - 3);
    } else if (preset === "This Month") {
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (preset === "Last 3 months") {
      fromDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    }

    if (fromDate) {
      searchParams.set("fromDate", fromDate.toISOString());
      searchParams.set("toDate", now.toISOString());
      searchParams.set("datePreset", preset);
    } else {
      searchParams.delete("fromDate");
      searchParams.delete("toDate");
      searchParams.delete("datePreset");
    }

    setSearchParams(searchParams);
  };

  const selectedServices = searchParams.getAll("transactionTypes");
  const selectedStatus = searchParams.get("status");
  const selectedDate = searchParams.get("datePreset");

  return (
    <div className="w-full py-2 rounded-md bg-white">
      <div className="flex flex-col">
        <h2 className="text-sm px-4 text-[#7901b1] font-semibold">Filter</h2>
        <span className="border-[0.5px] mx-3 border-[#D9D9D9]" />
        <Accordion
          type="multiple"
          defaultValue={["services"]}
          className="px-2 max-md:flex max-md:justify-between max-md:items-start"
        >
          <AccordionItem value="services" className="border-b-0 mt-2">
            <AccordionTrigger className="font-semibold px-1.5 py-1.5 bg-[#FAFAFA] rounded-sm border border-[#f1f1f1]">
              Services
            </AccordionTrigger>
            <AccordionContent className="mt-2.5 pb-1">
              {servicesConstant.map((service) => (
                <div key={service.name} className="flex flex-col my-1">
                  <div className="flex max-md:gap-2 justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{service.name}</span>
                    <Checkbox
                      checked={selectedServices.includes(service.name)}
                      onCheckedChange={() => toggleService(service.name)}
                    />
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
              {statusConstant.map((item) => (
                <div key={item.name} className="flex flex-col my-1">
                  <div className="flex max-md:gap-2 justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{item.name}</span>
                    <Checkbox
                      checked={selectedStatus === item.id}
                      onCheckedChange={() => toggleStatus(item.id)}
                    />
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
              {datesConstant.map((date) => (
                <div key={date.name} className="flex flex-col my-1">
                  <div className="flex max-md:gap-2 justify-between items-center text-sm text-[#8C8C8C]">
                    <span>{date.name}</span>
                    <Checkbox
                      checked={selectedDate === date.name}
                      onCheckedChange={() => toggleDate(date.name)}
                    />
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
