import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertUnixTimestampToDate, convertDateToUnixTimestamp, createDate } from './helpers/date-helper';
import Card from './Card';
import ChartFilter from './ChartFilter';
import { chartConfig } from '../constants/config';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/stockContext';

const Chart = () => { // the data the chart is using
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");
    const {stockSymbol} = useContext(StockContext);

    useEffect (() => { // finds start and end time stamp 
        const getDateRange = () => {
            const {days, weeks, months, years} = chartConfig[filter];

            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years); // calculates what the day was

            const startTimeStampUnix = convertDateToUnixTimestamp(startDate) // converts to unix time stamp
            const endTimeStampUnix = convertDateToUnixTimestamp(endDate); // converts to unix time stamp

            return {startTimeStampUnix, endTimeStampUnix};
        }; 

        const updateChartData = async () => {
            try {
                const {startTimeStampUnix, endTimeStampUnix} = getDateRange();
                const resolution = chartConfig[filter].resolution;
                const result = await fetchHistoricalData(stockSymbol, resolution, startTimeStampUnix, endTimeStampUnix);

                setData(formatData(result));

            } catch(error) {
                setData([])
                console.log(error);
            }

        };
        updateChartData();
    }, [stockSymbol, filter]); // dependencies -- either stock, or date filter

    
    // formatting the data so it can be used by the chart
    const formatData = (data) => { 
        return data.c.map((item, index) => { // mapping the list of close prices to create an array of objects
            return {
                value: item.toFixed(2),
                date: convertUnixTimestampToDate(data.t[index]), // taking the array of unix time stamps
            };
        });
    };
   return (
    <Card> {/* time period filter on chart*/}
        <ul className='flex absolute top-2 right-2 z-40'>
            {Object.keys(chartConfig).map((item) => {
                return (
                <li key = {item}>
                    <ChartFilter text = {item} 
                    active = {filter === item} 
                    onClick = {() => {
                        setFilter(item)
                    }} />
                </li>)
            })}
        </ul>
      <ResponsiveContainer>
        <AreaChart data = {data}> 
            

        <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor="#312e81" 
            stopOpacity={0.8}
            />
            <stop offset="95%" stopColor="#312e81" stopOpacity={0}/>
            </linearGradient>
        </defs>

            <Area // chart details
            type = "monotone" 
            dataKey = "value" 
            stroke = "#312e81" 
            fillOpacity = {1}
            strokeWidth = {0.5}
            fill = "url(#chartColor"
            />
            <Tooltip />
            <XAxis dataKey = {"date"} /> {/* x axis uses they date key */}
            <YAxis domain = {["dataMin", "dataMax"]} /> {/* y axis uses the min,max, and everything in between */}
        </AreaChart>
    </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
