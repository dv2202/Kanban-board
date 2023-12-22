import React,{useState} from "react";
import Card from "../components/Card";


const Home = ({ tickets, users }) => {
    const [selectedGroup, setSelectedGroup] = useState('status');
  
    const groupData = () => {
      switch (selectedGroup) {
        case 'status':
          return groupByStatus();
        case 'user':
          return groupByUser();
        case 'priority':
          return groupByPriority();
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
      return priorityGroups.map(priority => ({
        title: `Priority ${priority}`,
        tickets: tickets.filter(ticket => ticket.priority === priority),
      }));
    };
  
    return (
      <div>
        <div className="h-[70px] items-center flex ">
                <label>
                Grouping:
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="status">By Status</option>
                    <option value="user">By User</option>
                    <option value="priority">By Priority</option>
                </select>
                </label>

                
                <label>
                Ordering:
                <select >
                    <option value="priority">By Priority</option>
                </select>
                </label>
        </div>
        
        <div className="grid grid-cols-5 gap-[30px] w-97 mx-auto min-h-[92vh] p-10 bg-[#F4F5F8]">
            {groupData().map(group => (
                <Card key={group.title} title={group.title} tickets={group.tickets} users={users} className="col-span-1" />
            ))}
        </div>


        
      </div>
    );
  };
  
  export default Home;