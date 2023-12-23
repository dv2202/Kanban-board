import React from "react";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { TbAntennaBars4 } from "react-icons/tb";
import { TbAntennaBars5 } from "react-icons/tb";
import { TbAntennaBars1 } from "react-icons/tb";
import { FaExclamation } from "react-icons/fa6";
import { renderTitleContent } from "../utils/renderTitleContent";

const Card = ({ title, tickets, users, selectedGroup }) => {

      const getUserInfo = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user
          ? { name: user.name, available: user.available }
          : { name: "Unknown", available: false };
      };


      const renderPriorityBars = (priority) => {
            switch(priority){
                case 1 :
                    return(
                        <div className="h-4 w-4 items-center flex">
                            <TbAntennaBars1/>
                        </div>
                    )
                case 2 :
                    return(
                        <div className="h-4 w-4 items-center flex">
                            <TbAntennaBars4/>
                        </div>
                    )
                case 3 :
                    return(
                        <div className="h-4 w-4 items-center flex">
                            <TbAntennaBars5/>
                        </div>
                    )
                case 4:
                    return(
                        <div className="h-4 w-4 items-center flex bg-orange-500 rounded-md">
                            <FaExclamation/>
                        </div>
                    )
                default:
                    return(
                        <div></div>
                    )
            }
      }
      


  return (
    <div className="w-[100%]">
        <div className="flex flex-row items-center gap-1 mb-4 justify-between">
            <div className="flex flex-row items-center gap-2">     
                {renderTitleContent(title, selectedGroup, users,tickets[0]?.priority)}
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="text-slate-500">{tickets.length}</div>
            </div>

            <div className="flex flex-row gap-1 text-slate-500">
                <IoMdAdd />
                <SlOptions />
            </div>
        </div>
      

      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border p-4 rounded shadow-md bg-white flex flex-col gap-3 dark:bg-[#161B22] dark:border-[#5d636a] ">
            <div className="flex flex-row justify-between ">
               {
                selectedGroup !== "user" ? (
                  
                  <>
                   <p className="text-md text-slate-400">{ticket.id}</p>
                    <div className="relative">
                          <img
                              src={`https://api.dicebear.com/5.x/initials/svg?seed=${getUserInfo(ticket.userId).name}`}
                              alt="" className="h-4 w-4 rounded-full z-0"
                          />
                          {
                              getUserInfo(ticket.userId).available ? (<div className="h-[6px] w-[6px] rounded-full bg-orange-300 border border-white absolute right-0 bottom-2 z-10"></div>) : (<div className="h-2 w-2 rounded-full bg-slate-600 border border-white absolute right-0 bottom-2 z-10"></div>)
                          }
                    </div>
                  </>
                ) : (
                  <p className="text-md text-slate-400">{ticket.id}</p>
               )
               }
            </div>
            <h3 className="text-[16px] text-black font-medium leading-4 flex flex-row gap-1 dark:text-white">{
                selectedGroup === "user" ? (
                    renderTitleContent(ticket.status, 'status', users))
                : (
                    null
                )
                }{ticket.title}</h3>
            <div className="flex flex-row items-center gap-3">
                {
                  selectedGroup === 'priority' ? (<> 
                  <div className=" px-[4px] border w-fit rounded-md text-sm text-slate-500 flex flex-row items-center gap-2">
                  <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                  {ticket.tag}
              </div></>) : (
                  <>
                    <div className=" rounded-md border">
                        {renderPriorityBars(ticket.priority)}
                    </div>
                    <div className=" px-[4px] border border-[#474e56] w-fit rounded-md text-sm text-slate-500 flex flex-row items-center gap-2">
                        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                        {ticket.tag}
                    </div>
                  </>
                  )
                }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
