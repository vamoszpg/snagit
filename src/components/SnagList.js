import React, { useState } from 'react';
import SnagItem from './SnagItem';
import './SnagList.css';

const SnagList = ({ snags, onDeleteSnag, isMobile }) => {
  const [filter, setFilter] = useState({ severity: '', status: '', category: '' });

  const filteredSnags = snags.filter(snag => 
    (!filter.severity || snag.severity === filter.severity) &&
    (!filter.status || snag.status === filter.status) &&
    (!filter.category || snag.category === filter.category)
  );

  return (
    <div className={`snag-list-container ${isMobile ? 'mobile' : ''}`}>
      <div className="filter-controls">
        {/* Add filter dropdowns here */}
      </div>
      <div className="snag-list">
        {filteredSnags.map(snag => (
          <SnagItem
            key={snag.id}
            snag={snag}
            onDelete={() => onDeleteSnag(snag.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(SnagList);
