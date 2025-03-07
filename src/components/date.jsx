import React, { useState } from "react";
import moment from "moment";

const Calendar = () => {
    const [date, setDate] = useState(moment());
    const [startDate, setStartDate] = useState(moment().subtract(5, "day"));
    const [endDate, setEndDate] = useState(moment().add(3, "day"));

    const changeMonth = (month) => {
        setDate(moment(date).month(month));
    };

    const resetDate = () => {
        setDate(moment());
    };

    const changeDate = (selectedDate) => {
        if (
            startDate === null ||
            selectedDate.isBefore(startDate, "day") ||
            !startDate.isSame(endDate, "day")
        ) {
            setStartDate(moment(selectedDate));
            setEndDate(moment(selectedDate));
        } else if (
            selectedDate.isSame(startDate, "day") &&
            selectedDate.isSame(endDate, "day")
        ) {
            setStartDate(null);
            setEndDate(null);
        } else if (selectedDate.isAfter(startDate, "day")) {
            setEndDate(moment(selectedDate));
        }
    };

    const generateDays = () => {
        const days = [];
        const firstDayOfMonth = moment(date).startOf("month");
        const lastMonth = moment(date).subtract(1, "month");
        const daysInMonth = moment(date).daysInMonth();
        const prevMonthDays = lastMonth.daysInMonth();
        const nextMonth = moment(date).add(1, "month");

        for (let i = firstDayOfMonth.day(); i > 0; i--) {
            lastMonth.date(prevMonthDays - i + 1);
            days.push({ date: moment(lastMonth), muted: true });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: moment(date).date(i), muted: false });
        }

        while (days.length % 7 !== 0) {
            nextMonth.date(days.length - daysInMonth + 1);
            days.push({ date: moment(nextMonth), muted: true });
        }

        return days;
    };

    return (
        <div className="w-96 mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center bg-purple-500 text-white p-4 rounded-t-lg">
                <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
                <h1 onClick={resetDate} className="cursor-pointer text-xl">
                    {date.format("MMMM YYYY")}
                </h1>
                <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
            </div>
            <div className="grid grid-cols-7 text-center font-semibold mt-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-gray-500">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 text-center">
                {generateDays().map(({ date: day, muted }) => {
                    let classNames = "p-2 cursor-pointer rounded-full ";
                    if (muted) classNames += "text-gray-400 ";
                    if (moment().isSame(day, "day")) classNames += "bg-blue-500 text-white ";
                    if (day.isSame(startDate, "day")) classNames += "bg-purple-500 text-white ";
                    if (day.isBetween(startDate, endDate, "day")) classNames += "bg-purple-300 ";
                    if (day.isSame(endDate, "day")) classNames += "bg-purple-500 text-white ";
                    return (
                        <div
                            key={day.format("DD MM YYYY")}
                            className={classNames}
                            onClick={() => changeDate(day)}
                        >
                            {day.date()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;