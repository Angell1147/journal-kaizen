// utils.js
export const generateColor = (index) => {
    // Pre-defined color palette
    const colors = [
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#FFEEAD', // Light Yellow
      '#A8E6CF', // Mint
      '#45B7D1', // Light Blue
      '#96CEB4', // Sage Green
      '#9EC1CF', // Powder Blue
      '#D4A5A5', // Dusty Rose
      '#CC99C9', // Light Purple
      '#FAD02E', // Yellow
    ];
    
    return colors[index % colors.length];
  };