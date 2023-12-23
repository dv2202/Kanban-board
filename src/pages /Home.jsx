import React,{useState} from "react";
import Card from "../components/Card";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { useEffect } from "react";

const Home = ({ tickets, users }) => {
    const [selectedGroup, setSelectedGroup] = useState('status');
    const [showDropDown,setShowDropDown] = useState(true);
    const [showDark,setShowDark] = useState(false);
    const priorityTags = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority',
    };

    const toggleDropDown = ()=>{
        setShowDropDown(!showDropDown);
    }

    const togglesun = ()=>{
        setShowDark(!showDark)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', showDark);
      }, [showDark]);

    const groupData = () => {
      switch (selectedGroup) {
        case 'status':
          return groupByStatus();
        case 'user':
          return groupByUser();
        case 'priority':
          return groupByPriority();
        case 'title':
          return groupByTitle();
        default:
          return [];
      }
    };
  
    const groupByStatus = () => {
        const statusGroups = Array.from(new Set(tickets.map(ticket => ticket.status)));
        const additionalCategories = ['Done', 'Cancelled'];
        const updatedStatusGroups = [...statusGroups, ...additionalCategories];
        
        return updatedStatusGroups.map(status => ({
          title: status,
          tickets: tickets.filter(ticket => ticket.status === status),
        }));
      };
  
    const groupByUser = () => {
      return users.map(user => ({
        title: user.name,
        tickets: tickets.filter(ticket => ticket.userId === user.id),
      }));
    };
  
    const groupByPriority = () => {
      const priorityGroups = Array.from(new Set(tickets.map(ticket => ticket.priority)));
      priorityGroups.sort((a,b)=> a-b)
      return priorityGroups.map(priority => ({
        title: priorityTags[priority] || `Priority ${priority}`,
        tickets: tickets.filter(ticket => ticket.priority === priority),
      }));
    };

    const groupByTitle = () => {
      const titleGroups = Array.from(new Set(tickets.map(ticket => ticket.title)));
      titleGroups.sort((a, b) => a.localeCompare(b));
      return titleGroups.map(title => ({
        title: `By Title: ${title}`,
        tickets: tickets.filter(ticket => ticket.title === title),
      }));
    };
    
    
  
    return (
      <div>
        <div className="h-[70px] items-center flex justify-between px-[30px] dark:bg-[#161B22] dark:text-white ">
            <div className="flex items-center justify-between gap-3 p-[2px] rounded border border-solid border-gray-300 cursor-pointer text-gray-700 shadow-md relative dark:text-white " onClick={toggleDropDown} >
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"></path></svg>
                <div>Display</div>
                <div>
                    {
                        showDropDown ? (<MdOutlineKeyboardArrowDown />) : (<MdKeyboardArrowUp />)
                    }
                </div>
            </div>
                <div>
                    {
                        showDropDown ? (<div></div>) : (<div className="absolute flex z-[100] flex-col gap-5 top-[60px] left-7 border-radius-8 overflow-hidden transition-max-height duration-300 rounded-md ease-in-out bg-white border border-solid border-gray-300 dark:bg-[#161B22] shadow-md p-3 dark:border-[#343940]">
                        <label className="flex flex-row gap-[5rem] justify-between items-center">
                            Grouping:
                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="block p-1 w-full bg-white text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  cursor-pointer text-capitalize rounded border-1 border dark:text-white dark:bg-[#161B22] border-gray-300"
                            >
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
        
                        </label>
        
                        <label className="flex flex-row gap-[5rem] justify-between items-center dark:text-white dark:bg-[#161B22]">
                            Ordering:
                            <select className="block p-1 w-full bg-white text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  cursor-pointer text-capitalize rounded border-1 dark:text-white dark:bg-[#161B22] border border-gray-300">
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                            
                        </label>
                    </div>)
                    }
                </div>

            <div onClick={togglesun}>
                {
                    showDark ? (<IoMdMoon />) : (<MdSunny />)
                }
            </div>

        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px] mx-auto min-h-[92vh] p-5 bg-[#F4F5F8] dark:bg-black dark:text-white">
            {groupData().map(group => (
                <Card key={group.title} selectedGroup={selectedGroup} title={group.title} tickets={group.tickets} users={users} groupingByStatus={groupByStatus} groupingByUser={groupByUser} className="col-span-1" />
            ))}
        </div>



        
      </div>
    );
  };
  
  export default Home;