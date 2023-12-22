import React, { useEffect, useState } from 'react';
import Home from './pages /Home';


function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchTickets = async () => {
      const resp = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      const data = await resp.json();
      setTickets(data.tickets);
      setUsers(data.users);

    };

    fetchTickets();

  }, []);
  return (
    <div >
      <Home tickets={tickets} users={users}/>
    </div>
  );
}

export default App;
