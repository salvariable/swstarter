const searchCounts = {};

function recordSearch(name) {
  const key = name.toLowerCase();
  searchCounts[key] = (searchCounts[key] || 0) + 1;
}

function getStats() {
  return Object.entries(searchCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

module.exports = {
  recordSearch,
  getStats
};
