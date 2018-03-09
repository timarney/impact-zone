import React, { Component } from "react";
import glamorous from "glamorous";
import { css } from "glamor";
import format from "date-fns/format";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";
import getDay from "date-fns/get_day";
import eachDay from "date-fns/each_day";
import differenceInDays from "date-fns/difference_in_days";
import { datesToCal } from "../../../util/attendance";

css.insert(`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }
`);

const Container = glamorous.div({ textAlign: "center" });
const CalendarWrap = glamorous.div({ display: "flex", flexWrap: "wrap", justifyContent: "center" });
const MonthName = glamorous.div({ fontWeight: "bold", display: "flex", padding: 5, fontSize: "0.9em", color: "#ccc" });
const MonthWrap = glamorous.div({ marginRight: 5, marginBottom: 5, width: 190, border: "1px solid #ccc" });
const Row = glamorous.div({ display: "flex", flexWrap: "wrap" });
const Cell = glamorous.div({ width: `${100 / 7}%`, padding: 2, fontSize: "0.8em", border: "1px solid rgb(43, 43, 43)" });


const Month = ({ startDate, getItemProps }) => {
    const referenceDate = startDate;

    const firstDayOfMonth = startOfMonth(referenceDate);

    // all dates in a month
    const allDates = eachDay(firstDayOfMonth, endOfMonth(referenceDate));

    // pad `allDates` so dates display in correct column for the week
    const paddedDates = [...Array(getDay(firstDayOfMonth)).fill(), ...allDates];

    const daysOfWeek = eachDay(
        startOfWeek(referenceDate),
        lastDayOfWeek(referenceDate)
    );
    return (
        <MonthWrap>
            <MonthName>{format(referenceDate, "MMM YYYY")}</MonthName>
            <Row>
                {daysOfWeek.map(dayOfWeek => (
                    <Cell key={dayOfWeek}>{format(dayOfWeek, "dd")}</Cell>
                ))}
            </Row>
            <Row>
                {paddedDates.map((date, index) => {
                    const dateIndex = differenceInDays(date, startDate);
                    const props = date
                        ? getItemProps({
                            date,
                            index: dateIndex
                        })
                        : {};
                    const Component = Cell;
                    return (
                        <Component key={index} {...props}>
                            {date && format(date, "D")}
                        </Component>
                    );
                })}
            </Row>
        </MonthWrap>
    );
};

const dateToString = date => (date ? format(date, "YYYY-MM-DD") : "");

class Calendar extends React.Component {
    render() {
        const { dates, highlight } = this.props;

        let months = {};
        return (
            <CalendarWrap>
                {dates.map(date => {
                    const dateSet = new Set(dates);
                    const highlightSet = new Set(highlight);


                    const m = format(date, "MM");
                    if (months.hasOwnProperty(m)) {
                        return null;
                    }

                    months[m] = true;

                    return (
                        <Month
                            key={date}
                            startDate={date}
                            getItemProps={d => {
                                const dateStr = dateToString(d.date);
                                const doHighlight = highlightSet.has(dateStr);
                                if (dateSet.has(dateStr) && !doHighlight) {
                                    return {
                                        style: {
                                            backgroundColor: "rgb(254, 115, 123)",
                                            color: "#fff",
                                            borderRadius: 2,
                                        }
                                    };
                                }

                                if (doHighlight) {
                                    return {
                                        style: {
                                            backgroundColor: "rgb(102, 194, 121)",
                                            color: "#fff",
                                            borderRadius: 2
                                        }
                                    };
                                }
                            }}
                        />
                    );
                })}

            </CalendarWrap>
        )
    }
}

class Cal extends Component {
    state = { dates: false, attendance: false }
    componentDidMount() {
        const { dates } = this.props;
        const data = datesToCal(dates);
        this.setState({ dates: data.dates, attendance: data.attendance });
    }
    render() {
        const { dates, attendance } = this.state;

        if (!attendance) return null;
        return (<Container>
            <Calendar dates={dates} highlight={attendance} />
        </Container>
        )
    }
}


export default Cal;