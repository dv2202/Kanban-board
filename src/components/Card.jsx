import React from "react";

const Card = ({ title, tickets }) => (
  <div>
    <h2 className="text-lg font-semibold">{title}</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="border p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold ">{ticket.title}</h3>
          <p>Status: {ticket.status}</p>
          <p>User: {ticket.userId}</p>
          <p>Priority: {ticket.priority}</p>
        </div>
      ))}
  </div>
);

export default Card;
