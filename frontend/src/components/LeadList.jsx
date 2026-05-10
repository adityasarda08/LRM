import React, { useState } from 'react';

const LeadList = ({ leads, fetchLeads }) => {

  const [editingId, setEditingId] = useState(null);

  const updateStatus = async (id, status) => {
    await fetch(`https://lrm-1-tyhi.onrender.com/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    setEditingId(null); // 👈 hide dropdown after update
    fetchLeads();
  };

  const deleteLead = async (id) => {
    await fetch(`https://lrm-1-tyhi.onrender.com/api/leads/${id}`, {
      method: 'DELETE'
    });
    fetchLeads();
  };

  return (
    <div>
      <h2>Leads</h2>

      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.source}</td>

                <td>
                  {/* STATUS DISPLAY */}
                  <span className={`status ${lead.status.toLowerCase().replace(' ', '-')}`}>
                    {lead.status}
                  </span>

                  <br />

                  {/* CONDITIONAL UI */}
                  {editingId === lead.id ? (
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value)
                      }
                    >
                      <option>Interested</option>
                      <option>Not Interested</option>
                      <option>Converted</option>
                    </select>
                  ) : (
                    <button onClick={() => setEditingId(lead.id)}>
                      Update Status
                    </button>
                  )}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadList;