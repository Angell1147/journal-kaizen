// utils.js
export const generateColor = (index) => {
    // Pre-defined color palette
    const colors = [
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#45B7D1', // Light Blue
      '#96CEB4', // Sage
      '#FFEEAD', // Light Yellow
      '#D4A5A5', // Dusty Rose
      '#9EC1CF', // Powder Blue
      '#CC99C9', // Light Purple
      '#FAD02E', // Yellow
      '#A8E6CF', // Mint
    ];
    
    return colors[index % colors.length];
  };