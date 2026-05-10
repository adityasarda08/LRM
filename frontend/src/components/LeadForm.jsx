import React, { useState } from 'react';

const LeadForm = ({ fetchLeads }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    source: 'Call'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Name and Phone are required");
      return;
    }

    try {
      await fetch('https://lrm-1-tyhi.onrender.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setFormData({ name: '', phone: '', source: 'Call' });
      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Error adding lead");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lead</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <select name="source" value={formData.source} onChange={handleChange}>
        <option>Call</option>
        <option>WhatsApp</option>
        <option>Field</option>
      </select>

      <button type="submit">Add Lead</button>
    </form>
  );
};

export default LeadForm;