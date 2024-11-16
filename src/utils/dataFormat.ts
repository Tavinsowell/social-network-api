const addDateSuffix = (date: number): string => {
    let dateStr = date.toString();
  
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  
  const dateFormat = (
    timestamp: Date,
    { monthLength = 'short', dateSuffix = true } = {}
  ): string => {
    const months = monthLength === 'short'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate().toString();
  
    const year = dateObj.getFullYear();
  
    let hour = dateObj.getHours();
    if (hour > 12) {
      hour = Math.floor(hour / 2);
    } else if (hour === 0) {
      hour = 12;
    }
  
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  };
  
  export default dateFormat;