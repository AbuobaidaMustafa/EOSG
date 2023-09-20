import React, { useState } from "react";
import "./EOSGCalculator.css";

const EOSGCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [yearsOfService, setYearsOfService] = useState({ years: 0, months: 0 });
  const [eosgAmount, setEOSGAmount] = useState(0);

  const [basicSalaryError, setBasicSalaryError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!basicSalary || isNaN(basicSalary)) {
      setBasicSalaryError("Basic Salary must be a valid number.");
      isValid = false;
    } else {
      setBasicSalaryError("");
    }

    if (!startDate) {
      setStartDateError("Starting Date is required.");
      isValid = false;
    } else {
      setStartDateError("");
    }

    if (!endDate) {
      setEndDateError("Finishing Date is required.");
      isValid = false;
    } else {
      setEndDateError("");
    }

    return isValid;
  };

  const calculateEOSG = () => {
    if (!validateForm()) {
      // Form is not valid, do not calculate EOSG
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
    }

    setYearsOfService({ years, months });

    if (years < 1) {
      // Display an alert to the user for less than one year of service
      setAlertMessage(
        "You do not deserve End-of-Service Gratuity (EOSG) as you have less than one year of service."
      );
      // Reset EOSG amount
      setEOSGAmount(0);
    } else {
      // Clear any previous alert message
      setAlertMessage("");

      // Calculate EOSG
      const gratuityDays = years <= 5 ? 21 * years : 21 * 5 + 30 * (years - 5);
      const dailyRate = basicSalary / 30;
      const eosgAmount = dailyRate * gratuityDays;
      setEOSGAmount(eosgAmount);
    }
  };

  return (
    <div className="eosg-calculator">
      {/* ... (input fields and labels) */}
      <div className="input-group">
        <label htmlFor="basicSalary">Basic Monthly Salary (AED):</label>
        <input
          type="number"
          id="basicSalary"
          value={basicSalary}
          onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
        />
        <div className="error-message">{basicSalaryError}</div>
      </div>
      <div className="input-group">
        <label htmlFor="startDate">Starting Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <div className="error-message">{startDateError}</div>
      </div>
      <div className="input-group">
        <label htmlFor="endDate">Finishing Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="error-message">{endDateError}</div>
      </div>
      <button className="calculate-button" onClick={calculateEOSG}>
        Calculate EOSG
      </button>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <div className="result">
        {yearsOfService.years > 0 && (
          <div>
            <h3>Years of Service:</h3>
            <p>
              {yearsOfService.years} years and {yearsOfService.months} months
            </p>
          </div>
        )}
        {eosgAmount > 0 && (
          <div>
            <h3>End-of-Service Gratuity (EOSG):</h3>
            <p>AED {eosgAmount.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EOSGCalculator;
