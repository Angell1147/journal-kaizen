

import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./WaterBreakReminder.css";

const WaterBreakReminder = () => {
  const [dailyTarget, setDailyTarget] = useState(() =>
    parseFloat(localStorage.getItem("dailyTarget")) || 0
  );
  const [consumedWater, setConsumedWater] = useState(() =>
    parseFloat(localStorage.getItem("consumedWater")) || 0
  );
  const [hourlyIntake, setHourlyIntake] = useState(0);
  const [startDateTime, setStartDateTime] = useState(() =>
    localStorage.getItem("startDateTime") || "2024-11-10T08:00"
  );
  const [endDateTime, setEndDateTime] = useState(() =>
    localStorage.getItem("endDateTime") || "2024-11-10T20:00"
  );
  const [waterDrunkThisHour, setWaterDrunkThisHour] = useState(0);
  const [dailyDataHistory, setDailyDataHistory] = useState(() =>
    JSON.parse(localStorage.getItem("dailyDataHistory")) || []
  );

  useEffect(() => {
    calculateHourlyIntake(dailyTarget, startDateTime, endDateTime);
  }, [dailyTarget, startDateTime, endDateTime]);

  useEffect(() => {
    localStorage.setItem("dailyTarget", dailyTarget);
    localStorage.setItem("consumedWater", consumedWater);
    localStorage.setItem("startDateTime", startDateTime);
    localStorage.setItem("endDateTime", endDateTime);
    localStorage.setItem("dailyDataHistory", JSON.stringify(dailyDataHistory));
  }, [dailyTarget, consumedWater, startDateTime, endDateTime, dailyDataHistory]);

  const calculateHourlyIntake = (target, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const hoursInDay = (endDate - startDate) / (1000 * 60 * 60);

   

    const intakePerHour = (target * 1000) / hoursInDay;
    setHourlyIntake(intakePerHour);
  };

  const submitDrinkAmount = () => {
    if (waterDrunkThisHour <= 0) {
      alert("Please enter a valid water amount.");
      return;
    }
    setConsumedWater((prev) => prev + waterDrunkThisHour);
    setWaterDrunkThisHour(0);
  };

  const handleReset = () => {
    const currentDate = new Date().toLocaleDateString();
    setDailyDataHistory((prevData) => [
      ...prevData,
      {
        date: currentDate,
        target: dailyTarget,
        consumed: (consumedWater / 1000).toFixed(2),
      },
    ]);
    setDailyTarget(0);
    setConsumedWater(0);
    setWaterDrunkThisHour(0);
    setHourlyIntake(0);
    setStartDateTime("2024-11-10T08:00");
    setEndDateTime("2024-11-10T20:00");
  };

  const progress = dailyTarget
    ? Math.min(consumedWater / (dailyTarget * 1000), 1)
    : 0;

  const deleteHistoryEntry = (index) => {
    const updatedHistory = dailyDataHistory.filter((_, i) => i !== index);
    setDailyDataHistory(updatedHistory);
  };

  return (
    <div className="water-break-reminder">
      <h1>Water Break Reminder</h1>
      <label>
        Daily Target (liters):
        <input
          type="number"
          value={dailyTarget}
          onChange={(e) => setDailyTarget(Math.max(0, Number(e.target.value)))}
          min="0.5"
          step="0.1"
        />
      </label>

      <div className="time-inputs">
        <label>
          Start Date & Time:
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </label>
        <label>
          End Date & Time:
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </label>
      </div>

      <div className="hourly-target">
        <strong>Hourly Target: {hourlyIntake.toFixed(0)} ml</strong>
      </div>

      <div className="gauge-container">
        <GaugeChart
          id="water-gauge"
          nrOfLevels={20}
          colors={["#ddd", "#00bcd4"]}
          arcWidth={0.3}
          percent={progress}
          textColor="#333"
        />
      </div>

      <div className="drink-input">
        <label>
          Enter volume of water drunk this hour (ml):
          <input
            type="number"
            value={waterDrunkThisHour}
            onChange={(e) =>
              setWaterDrunkThisHour(Math.max(0, Number(e.target.value)))
            }
            min="0"
            step="50"
          />
        </label>
        <button onClick={submitDrinkAmount}>Submit</button>
      </div>

      <div className="reset-container">
        <button className="reset-button" onClick={handleReset}>
          Reset Target
        </button>
      </div>

      <div className="daily-history">
        <h3>Daily Consumption History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Target (Liters)</th>
              <th>Consumed (Liters)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dailyDataHistory.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.target}</td>
                <td>{data.consumed}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => deleteHistoryEntry(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterBreakReminder;
