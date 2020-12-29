import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country && country !== 'global') {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData;
    } catch (error) {

    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
        return error;
    }
};


export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
};

export const fetchStatesData = async (state = "", district = "") => {
    try {
        const { data } = await axios.get("https://api.covidindiatracker.com/state_data.json");
        if (state && state !== "" && !district && district === "") {
            const { confirmed, recovered, deaths } = data.filter((d) => d.state === state)[0];
            const modifiedData = { confirmed: { value: confirmed }, recovered: { value: recovered }, deaths: { value: deaths } }
            return modifiedData;
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchDistrictsName = async (state = "") => {
    try {
        const { data } = await axios.get("https://api.covidindiatracker.com/state_data.json");
        if (state && state !== "") {
            const { districtData } = data.filter((d) => d.state === state)[0];
            return districtData.map((d) => d.name);
        }
        return null;
    } catch (error) {
        return error;
    }
};



export const fetchDistrictsData = async (state = "", district = "") => {
    try {
        const { data } = await axios.get("https://api.covidindiatracker.com/state_data.json");
        if (state && state !== "" && district && district !== "") {
            const { districtData } = data.filter((d) => d.state === state)[0];
            const { confirmed } = districtData.filter((d) => d.name === district)[0];
            const modifiedData = { confirmed: { value: confirmed } }
            return modifiedData;
        }
        return null;
    } catch (error) {
        return error;
    }
};

