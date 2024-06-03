import './Calendar.css'
import React, { useState, useEffect } from 'react';
import arrow_l from '../Assets/arrow_bk@2x.png'
import arrow_r from '../Assets/arrow_bj@2x.png'
import checkIcon from '../Assets/logo-ICON@2x.png';
import api from '../api';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text-year">
                        {format(currentMonth, 'yyyy')}년 
                    </span>
                    {format(currentMonth, 'M')}월
                </span>
            </div>
            <div className="col col-end">
            <img src={arrow_l} alt="" onClick={prevMonth} />
            <img src={arrow_r} alt="" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, paintings }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const dayHasPainting = paintings.some(painting =>
                isSameDay(parseISO(painting.local_date_time), cloneDay)
            );
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(cloneDay, monthStart)
                            ? 'disabled'
                            : isSameDay(cloneDay, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(cloneDay, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={cloneDay}
                    // onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(cloneDay, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                    {dayHasPainting && <img src={checkIcon} alt="Check" className="check-icon" />}
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        api.get('/paintings/')
            .then(response => {
                setPaintings(response.data.data);
            })
            .catch(error => {
                console.error('Failed to fetch paintings:', error);
            });
    }, []);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
                paintings={paintings}
            />
        </div>
    );
};

export default Calendar;
