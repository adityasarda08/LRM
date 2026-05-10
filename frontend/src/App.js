import React, { useEffect, useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Dashboard
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;
  const interestedLeads = leads.filter((l) => l.status === "Interested").length;

  // Search filter
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search),
  );

  return (
    <div className="container">
      <h1>Lead Management System</h1>

      {/* Dashboard */}
      <div className="dashboard">
        <div>Total: {totalLeads}</div>
        <div>Converted: {convertedLeads}</div>
        <div>Interested: {interestedLeads}</div>
      </div>

      {/* Search */}
      <input
        className="search-bar"
        type="text"
        placeholder=" Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <LeadForm fetchLeads={fetchLeads} />
      <LeadList leads={filteredLeads} fetchLeads={fetchLeads} />
    </div>
  );
}

export default App;
