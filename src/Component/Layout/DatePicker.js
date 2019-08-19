import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default function DatePicker({onChange}) {
  return (
      
    <div>
      <p>Date of Birth</p>
      <DayPickerInput onDayChange={onChange} />
    </div>
  );
}
