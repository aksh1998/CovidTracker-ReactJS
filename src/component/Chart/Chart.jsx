import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar,Chart } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { PieChart } from 'react-minimal-pie-chart';
const DisplayChart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    }, [])

    const lineChart = (
        dailyData.length ?
            (<Line data={{
                labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        fill: true
                    },
                ]
            }} />) : null
    );

    const barChart = (
        data.confirmed
            ? (
                <Bar
                    data={{
                        labels: [(data.confirmed ? 'Infected' : ''), (data.recovered ? 'Recovered' : ''), (data.deaths ? 'Deaths' : '')],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['blue', 'green', 'red'],
                            data: [(data.confirmed ? data.confirmed.value : 0), (data.recovered ? data.recovered.value : null), (data.deaths ? data.deaths.value : null)]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                    }}
                />
            ) : null
    )
    return (
        <div className={styles.container}>
            {(country && country !== 'global') ? barChart : lineChart}
        </div>
    );
}

export default DisplayChart;