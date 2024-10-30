import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketStatus = ({ status: initialStatus, ticketId }) => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const fetchTicketStatus = async () => {
      try {
        const response = await axios.get(`/api/tickets/${ticketId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching ticket status:', error);
      }
    };

    if (ticketId) {
      fetchTicketStatus();
      // Poll for status updates every 30 seconds
      const interval = setInterval(fetchTicketStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [ticketId]);

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'green';
      case 'pending':
        return 'orange';
      case 'closed':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <div className="ticket-status">
      <span 
        className="status-indicator"
        style={{ backgroundColor: getStatusColor() }}
      ></span>
      <span className="status-text">
        Ticket #{ticketId}: {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default TicketStatus; 