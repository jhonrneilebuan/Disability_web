export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  time = time.replace(/^0/, '');

  return time;
};

