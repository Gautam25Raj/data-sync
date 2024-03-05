"use client";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useUser from "@/hooks/useUser";

import { toggleNewContactModal } from "@/redux/slice/modalSlice";

import ContactTabSearch from "../chat/contacts/ContactTabSearch";

export default function AddContactPopUp() {
  const dispatch = useDispatch();
  const [queryType, setQueryType] = useState("username");

  const { getUserByUsername, getUserByEmail } = useUser();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(null);
  const isOpen = useSelector((state) => state.modal.newContactModal);

  const handleSearchClick = async (e) => {
    e.preventDefault();

    if (query === "") {
      toast.error("Please enter a username or email");
      return;
    }

    if (queryType === "username") {
      const data = await getUserByUsername(query);

      if (data) {
        setUsers([data]);
        return;
      }

      setUsers(null);
    } else {
      const data = await getUserByEmail(query);

      if (data) {
        setUsers([data]);
        return;
      }

      setUsers(null);
    }
  };

  return (
    isOpen && (
      <div className="absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-lg z-50">
        <div className=" flex justify-center h-full items-center ">
          <div className="w-[668px] h-full px-4 py-5 flex items-center justify-center">
            <div
              className="w-full rounded-lg p-[0.5px]"
              // style={{
              //   background:
              //     "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              // }}
            >
              <div className={"h-full w-full rounded-lg bg-white "}>
                <Card className={"h-full w-full rounded-lg bg-white pb-1"}>
                  <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none bg-white"
                  >
                    <div className=" flex flex-col justify-between gap-8 pb-1 relative">
                      <div>
                        <Typography variant="h2" color="black">
                          Add Contact
                        </Typography>

                        <Typography
                          color="black"
                          variant="paragraph"
                          className={"mt-1 font-normal"}
                        >
                          Add a new contact to your list
                        </Typography>
                      </div>

                      <XMarkIcon
                        className="h-9 w-9 text-black hover:cursor-pointer absolute top-0 right-0 p-1 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => {
                          dispatch(toggleNewContactModal());
                          setUsers(null);
                          setQuery("");
                        }}
                      />
                    </div>
                  </CardHeader>

                  <CardBody className="p-4 flex flex-col w-full gap-4">
                    <form className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <div className="w-[65%]">
                          <Input
                            variant="outlined"
                            label="Search"
                            color="black"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            icon={
                              <MagnifyingGlassIcon className={"text-black"} />
                            }
                          />
                        </div>

                        <div className="w-[30%]">
                          <Select
                            label="Search By"
                            className={
                              "border-b-black border-x-black text-black "
                            }
                            labelProps={{
                              className:
                                "before:border-black after:border-black text-black",
                            }}
                            value={queryType}
                            onChange={(e) => setQueryType(e)}
                          >
                            <Option value="username">Username</Option>
                            <Option value="email">User Email</Option>
                          </Select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className={
                          "bg-black  w-full flex flex-row text-white items-center justify-center text-sm font-bold rounded-lg"
                        }
                        style={{
                          textTransform: "none",
                        }}
                        onClick={handleSearchClick}
                      >
                        Search User
                        <span>
                          <MagnifyingGlassIcon className="h-4 w-4 ml-2 text-white" />
                        </span>
                      </Button>
                    </form>

                    <Typography variant="h2" color="black">
                      Results
                    </Typography>

                    {users ? (
                      users.length > 0 ? (
                        users.map((user) => (
                          <ContactTabSearch
                            key={user._id}
                            username={user.username}
                            email={user.email}
                            id={user._id}
                          />
                        ))
                      ) : (
                        <p>No user found</p>
                      )
                    ) : (
                      <p>Search contacts by Username or Email</p>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
