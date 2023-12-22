import React from "react";

const Card = ({ title, tickets, users }) => {
    const getUserInfo = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user
          ? { name: user.name, available: user.available }
          : { name: "Unknown", available: false };
      };

  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border p-4 rounded shadow-md bg-white ">
            <div className="flex flex-row justify-between ">
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
            </div>
            <h3 className="text-[16px] text-black font-medium">{ticket.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
