import React, { useState } from 'react';
import DatePicker from './components/date-picker/DatePicker';

function App() {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <div className="App">
        <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} />
      </div>
    );
  }

export default App;
