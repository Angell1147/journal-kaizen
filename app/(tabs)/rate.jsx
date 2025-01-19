import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const MoodTracker = () => {
  // ... [Previous state and helper functions remain the same until the return statement]
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useState({});
  const currentDate = new Date();
  const [currentMonth] = useState(currentDate.getMonth());
  const [currentYear] = useState(currentDate.getFullYear());

  const moods = [
    { label: 'Happy', color: '#4CAF50' },
    { label: 'Depressed', color: '#FF5722' },
    { label: 'Anxiety', color: '#03A9F4' },
    { label: 'Irritability', color: '#FFC107' },
    { label: 'Elevated', color: '#9C27B0' },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (year, month, day) => {
    return new Date(year, month, day).getDay();
  };

  const handleDateSelect = (date) => {
    if (selectedMood) {
      const dateStr = `${date}`;
      setMoodData(prev => ({
        ...prev,
        [dateStr]: selectedMood
      }));
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1);

  // Calculate mood counts and percentages
  const totalMoodCount = Object.values(moodData).length;
  const moodCounts = moods.map(mood => {
    const count = Object.values(moodData).filter(m => m === mood.label).length;
    const percentage = totalMoodCount > 0 ? ((count / totalMoodCount) * 100).toFixed(2) : 0;
    return {
      name: mood.label,
      value: count,
      percentage: percentage,
      color: mood.color
    };
  }).filter(mood => mood.value > 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {monthNames[currentMonth]} {currentYear}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Selected Mood Indicator */}
        {selectedMood && (
          <div className="text-center mb-4">
            Currently selected: <span className="font-semibold">{selectedMood}</span>
            <button 
              onClick={() => setSelectedMood(null)}
              className="ml-2 text-sm text-gray-500 hover:text-gray-700"
            >
              (clear selection)
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const mood = moodData[day];
              const moodColor = moods.find(m => m.label === mood)?.color;
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className="aspect-square rounded border border-gray-200 flex items-center justify-center transition-colors hover:border-gray-400"
                  style={{
                    backgroundColor: moodColor || '#FFF',
                    color: moodColor ? 'white' : 'black'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood Selection Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          {moods.map(mood => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`px-4 py-2 rounded text-white font-semibold transition-all ${
                selectedMood === mood.label ? 'ring-4 ring-offset-2 ring-offset-gray-50' : 'hover:scale-105'
              }`}
              style={{ backgroundColor: mood.color }}
            >
              {mood.label}
            </button>
          ))}
        </div>

        {/* Mood Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="col-span-full text-center mb-2 font-semibold">Mood Statistics:</div>
          {moods.map(mood => {
            const moodData = moodCounts.find(m => m.name === mood.label) || { percentage: 0, value: 0 };
            return (
              <div key={mood.label} className="flex items-center space-x-3">
                <div 
                  className="w-5 h-5 rounded"
                  style={{ backgroundColor: mood.color }}
                />
                <div className="flex-1">
                  <span className="font-semibold">{mood.label}:</span>
                  <span className="ml-2">{moodData.percentage}%</span>
                  <span className="text-sm text-gray-500 ml-2">({moodData.value} days)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie Chart */}
        <div className="w-full" style={{ height: '400px' }}>
          <PieChart width={800} height={400} className="w-full">
            <Pie
              data={moodCounts}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            >
              {moodCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${moodCounts.find(m => m.name === name)?.percentage}%`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
