const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

async function searchPeople(name) {
    const url = `https://swapi.tech/api/people/?name=${name}`;
    const response = await fetch(url, { agent });
    const data = await response.json();
    return data.result || [];
}

async function searchMovies(name) {
    const url = `https://swapi.tech/api/films/?title=${name}`;
    const response = await fetch(url, { agent });
    const data = await response.json();
    return data.result || [];
}

module.exports = { searchPeople, searchMovies };
