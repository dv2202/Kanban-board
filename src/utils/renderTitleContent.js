// import { TbAntennaBars3 } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { LiaCircleSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";
import { TbAntennaBars2, TbAntennaBars4 } from "react-icons/tb";
import { TbAntennaBars5 } from "react-icons/tb";
import { TbAntennaBars1 } from "react-icons/tb";
import { FaExclamation } from "react-icons/fa6";

export const renderTitleContent = (title, type, users,priority ) => {
    console.log(type);
  switch (type) {
    case 'status':
            switch (title) {
                case 'Todo':
                return <LiaCircleSolid />;
                case 'Backlog':
                return <div className="h-3 w-3 border border-dotted border-slate-700 rounded-full"></div>;
                case 'In progress':
                return (
                    <div>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="icon"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'rgb(245, 200, 66)' }}
                    >
                        <path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path>
                    </svg>
                    </div>
                );
                case 'Done':
                return <div className="w-3 h-3 bg-blue-700 rounded-full flex text-white text-center items-center text-xs"><MdDone /></div>;
                case 'Cancelled':
                return <div><MdOutlineCancel /></div>;
                default:
                return <div></div>;
      }
    case 'user':
        const isAvailable = (userName) => {
            const user = users.find((user) => user.name === userName);
            return user ? user.available : false;
        };
      return (
        <div className="relative">
                          <img
                              src={`https://api.dicebear.com/5.x/initials/svg?seed=${title}`}
                              alt="" className="h-4 w-4 rounded-full z-0"
                          />
                          {
                              isAvailable(title) ? (<div className="h-[6px] w-[6px] rounded-full bg-orange-300 border border-white absolute right-0 bottom-0 z-10"></div>) : (<div className="h-2 w-2 rounded-full bg-slate-600 border border-white absolute right-0 bottom-0 z-10"></div>)
                          }
        </div>
      );
    case 'priority':
        switch(priority){
            case '0':
                return(
                    <div>
                        
                    </div>
                )
            case 1 :
                return(
                    <div className="h-4 w-4 items-center flex">
                        <TbAntennaBars2/>
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
                    <div><TbAntennaBars1/></div>
                )
        }

    default:
      return <div></div>;
    }
};
