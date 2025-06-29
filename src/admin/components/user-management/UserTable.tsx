import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ChevronRightCircle, Trash2, User2, UserLock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const UserTable = () => {
  const contents = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      email: "gabriel@gmail.com",
      phoneNumber: "08123456789",
      address: "No. 10, Oyin Street, Ibadan, Delta State",

      status: "Verified",
    },
    {
      id: 2,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      email: "gabriel@gmail.com",
      phoneNumber: "08123456789",
      address: "No. 10, Oyin Street, Ibadan, Delta State",

      status: "Verified",
    },
    {
      id: 3,
      user: {
        name: "John Doe",
      },
      email: "gabriel@gmail.com",
      phoneNumber: "08123456789",
      address: "No. 10, Oyin Street, Ibadan, Delta State",

      status: "Verified",
    },
  ];

  return (
    <div className="bg-white rounded-md px-3 py-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          KYC Verification
        </h3>
        <span className="border-b-[0.5px] w-full border-[#D9D9D9]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs">Name</TableHead>
            <TableHead className="font-semibold text-xs">Email</TableHead>
            <TableHead className="font-semibold text-xs">
              Phone number
            </TableHead>
            <TableHead className="font-semibold text-xs">
              Residential Address
            </TableHead>
            <TableHead className="font-semibold text-xs">Status</TableHead>
            <TableHead className="font-semibold sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id} className="font-medium text-xs">
              <TableCell>
                <div className="flex items-center font-semibold gap-1">
                  {content.user.avatar ? (
                    <img
                      src={content.user.avatar}
                      className="size-8 rounded-full object-contain"
                    />
                  ) : (
                    <div className="p-1 rounded-full bg-[#28003E]">
                      <User2 className="fill-[#B71FFF]/40 size-6" />
                    </div>
                  )}
                  {content.user.name}
                </div>
              </TableCell>
              <TableCell>{content.email}</TableCell>
              <TableCell>{content.phoneNumber}</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[170px] xl:max-w-[210px]">
                {content.address}
              </TableCell>
              <TableCell>{content.status}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                  </DialogTrigger>
                  <DialogContent className="w-[402px]">
                    <DialogTitle className="sr-only">User Details</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col mt-2 gap-2">
                        <div className="flex text-foreground justify-between items-center">
                          <h3 className="text-xs font-semibold">Name</h3>
                          <p className="text-xs font-light">
                            {content.user.name}
                          </p>
                        </div>
                        <div className="flex text-foreground justify-between items-center">
                          <h3 className="text-xs font-semibold">Email</h3>
                          <p className="text-xs font-light">{content.email}</p>
                        </div>
                        <div className="flex text-foreground justify-between items-center">
                          <h3 className="text-xs font-semibold">
                            Phone Number
                          </h3>
                          <p className="text-xs font-light">
                            {content.phoneNumber}
                          </p>
                        </div>
                        <div className="flex w-full text-foreground justify-between items-start">
                          <h3 className="text-xs font-semibold">
                            Resedential Address
                          </h3>
                          <p className="text-xs text-end w-[60%] font-light">
                            {content.address}
                          </p>
                        </div>
                        <div className="flex text-foreground justify-between items-center">
                          <h3 className="text-xs font-semibold">Status</h3>
                          <p className="text-xs font-light">{content.status}</p>
                        </div>
                      </div>
                    </DialogDescription>
                    <div className="flex w-full gap-5">
                      <button className="flex gap-2 w-1/2 items-center justify-center rounded-md font-semibold cursor-pointer border border-[#7901b1] text-[#7901b1] hover:bg-accent">
                        <span>Freeze</span>
                        <UserLock className="size-5" />
                      </button>
                      <button className="flex justify-center items-center gap-2 font-semibold w-1/2 btn-primary">
                        <span>Delete</span>
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
