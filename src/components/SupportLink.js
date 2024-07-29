// src/components/SupportLink.js
import React from 'react';

export default function SupportLink() {
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', background: '#f4f4f4', textAlign: 'left' }}>
      <p>
        <button 
          onClick={() => window.location.href = 'https://docs.adapty.io/discuss'} 
          style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Feedback? Let Us Know
        </button>
      </p>
      <p>
        <button 
          onClick={() => window.location.href = 'mailto:support@adapty.io'} 
          style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Support: We're Here to Help
        </button>
      </p>
    </div>
  );
}
