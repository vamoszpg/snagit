import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SnagForm from './SnagForm';
import SnagList from './SnagList';
import { exportToPDF } from '../utils/pdfExport';
import './Dashboard.css';

const Dashboard = ({ snags, onAddSnag, onDeleteSnag, onSaveReport, onClearAllSnags, isMobile }) => {
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportName, setReportName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);

  const rooms = ['All', ...new Set(snags.map(snag => snag.category))];

  const filteredSnags = snags.filter(snag => 
    (selectedRoom === 'All' || snag.category === selectedRoom) &&
    ((snag.title && snag.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (snag.description && snag.description.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleSaveReport = async () => {
    if (!reportName) {
      alert('Please enter a report name');
      return;
    }
    setIsLoading(true);
    try {
      const newReport = {
        name: reportName,
        snags: filteredSnags.map(snag => ({
          id: snag.id,
          title: snag.title,
          category: snag.category,
          description: snag.description,
          date: snag.date,
          image: snag.image
        })),
        createdAt: new Date().toISOString()
      };
      await onSaveReport(newReport);
      setReportName('');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to save report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToPDF = async () => {
    try {
      const pdfReportName = reportName || 'Snag Report';
      await exportToPDF(filteredSnags, pdfReportName);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className={`dashboard ${isMobile ? 'mobile' : ''}`}>
        <div className="dashboard-content">
          <SnagForm 
            onSubmit={onAddSnag} 
            isMobile={isMobile} 
            totalSnags={snags.length}
          />
          <button 
            onClick={() => setIsControlsExpanded(!isControlsExpanded)} 
            className="toggle-controls-btn"
          >
            {isControlsExpanded ? 'Hide Controls' : 'Show Controls'}
          </button>
          {isControlsExpanded && (
            <div className="dashboard-controls">
              <select 
                value={selectedRoom} 
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="room-filter"
              >
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Search snags..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="snag-search"
              />
              <input 
                type="text"
                placeholder="Report Name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="report-name"
              />
              <button 
                onClick={handleSaveReport} 
                className="save-report-btn" 
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Report'}
              </button>
              <button onClick={handleExportToPDF} className="export-pdf-btn">Export to PDF</button>
              <button onClick={onClearAllSnags} className="clear-snags-btn">Clear All Snags</button>
            </div>
          )}
          <SnagList snags={filteredSnags} onDeleteSnag={onDeleteSnag} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  snags: PropTypes.array.isRequired,
  onAddSnag: PropTypes.func.isRequired,
  onDeleteSnag: PropTypes.func.isRequired,
  onSaveReport: PropTypes.func.isRequired,
  onClearAllSnags: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Dashboard;
