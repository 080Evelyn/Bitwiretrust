import { Skeleton } from "../ui/skeleton";

const MainLoader = () => {
  return (
    <div className="max-md:mt-3 h-screen w-screen flex">
      {/* Sidebar  */}
      <Skeleton className="hidden w-[11.25rem] xl:w-[12.5rem] h-full lg:block" />

      {/* Main Content  */}
      <div className="flex flex-col gap-3 flex-1 p-4">
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-12 w-60" />
          <div className="flex justify-end items-center gap-3">
            <Skeleton className="size-10" />
            <Skeleton className="size-15 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-full h-40 rounded-md" />
        <div className="flex flex-col md:flex-row gap-3 h-full">
          <div className="flex flex-col w-full md:w-[40%] gap-2">
            <div className="flex justify-between">
              <Skeleton className="size-20 md:size-16 lg:size-21 " />
              <Skeleton className="size-20 md:size-16 lg:size-21" />
              <Skeleton className="size-20 md:size-16 lg:size-21" />
              <Skeleton className="size-20 md:size-16 lg:size-21" />
            </div>
            <div className="hidden md:flex gap-4 h-full">
              <Skeleton className="w-1/2 h-full" />
              <Skeleton className="w-1/2 h-full" />
            </div>
          </div>
          <Skeleton className="w-full md:w-[60%] h-full" />
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
