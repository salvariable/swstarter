let queryLog = [];
let computedStats = {
  topFive: [],
  averageTime: 0,
  busiestHour: null,
};

// Call this function to log a query
function logQuery(term, duration) {
  queryLog.push({
    term,
    duration,
    timestamp: new Date(),
  });
}

// Every 5 minutes, compute statistics based on the logged queries
function computeStats() {
  if (queryLog.length === 0) return;

  const total = queryLog.length;

  // a. Top 5 most searched terms
  const termCounts = {};
  queryLog.forEach(({ term }) => {
    termCounts[term] = (termCounts[term] || 0) + 1;
  });
  const topFive = Object.entries(termCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term, count]) => ({
      term,
      count,
      percentage: ((count / total) * 100).toFixed(2) + '%',
    }));

  // b. Average time taken for queries
  const averageTime = (
    queryLog.reduce((sum, q) => sum + q.duration, 0) / total
  ).toFixed(2);

  // c. Hour of the day with the most queries
  const hourMap = {};
  queryLog.forEach(({ timestamp }) => {
    const hour = new Date(timestamp).getHours();
    hourMap[hour] = (hourMap[hour] || 0) + 1;
  });
  const busiestHour = Object.entries(hourMap)
    .sort((a, b) => b[1] - a[1])[0][0];

  computedStats = {
    topFive,
    averageTime,
    busiestHour,
  };
}

// Start the interval to compute stats every 5 minutes
setInterval(computeStats, 5 * 60 * 1000);

function getStats() {
  return computedStats;
}

module.exports = {
  logQuery,
  getStats,
};
