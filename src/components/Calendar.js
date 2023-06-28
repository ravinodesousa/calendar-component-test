import moment from "moment";
import React, { useEffect, useState } from "react";
import { Tab, Table } from "react-bootstrap";

function Calendar({ date }) {
  const [data, setData] = useState([]);
  const weeks = [
    { dow: 0, name: "Sun" },
    { dow: 1, name: "Mon" },
    { dow: 2, name: "Tue" },
    { dow: 3, name: "Wed" },
    { dow: 4, name: "Thu" },
    { dow: 5, name: "Fri" },
    { dow: 6, name: "Sat" },
  ];

  useEffect(() => {
    initCalendar();
  }, [date]);

  const initCalendar = () => {
    let calendarData = [];
    let selected_date = moment(date);
    let start_of_month = moment(date).startOf("month");
    let start_date = start_of_month;
    let end_of_month = moment(date).endOf("month");

    let count = 1;

    // Adding empty day slots at start of the week if its not starting on sunday
    for (let i = 0; i < start_of_month.day(); i++) {
      let dayData = {
        title: null,
        is_selected: false,
      };
      calendarData.push(dayData);
    }

    // getting all dates from selected month
    while (start_date.isSameOrBefore(end_of_month)) {
      let dayData = {
        title: count++,
        is_selected: start_date.isSame(selected_date),
      };
      calendarData.push(dayData);
      start_date.add(1, "day");
    }

    // Adding empty day slots at end of the week if its not ending on saturday
    for (let j = end_of_month.day() + 1; j < 7; j++) {
      let dayData = {
        title: null,
        is_selected: false,
      };
      calendarData.push(dayData);
    }

    // divide into weeks
    let weeklyData = [];
    while (calendarData.length > 0) weeklyData.push(calendarData.splice(0, 7));

    setData(weeklyData);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th colSpan={7} className="text-center">
            {moment(date).format("MMMM YYYY")}
          </th>
        </tr>
        <tr>
          {weeks.map((week, idx) => {
            return <th key={`week_header_${idx}`}>{week?.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((weeks, idx) => (
          <tr key={`week_row_${idx}`}>
            {weeks.map((week, idx2) => (
              <td className={`text-center`} key={`day_${idx}_${idx2}`}>
                <span
                  className={`rounded-circle p-2 ${
                    week?.is_selected ? "bg-primary text-light" : ""
                  }`}
                  data-testid={week?.is_selected ? "selected_date" : ""}
                >
                  {week?.title}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Calendar;
