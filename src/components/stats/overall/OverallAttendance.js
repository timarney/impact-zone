import React, { Component } from "react";
import { VictoryPie } from "victory";
import classNames from "classnames";

class OverallAttendance extends Component {
  state = {};
  render() {
    const { present, absent, attendance } = this.props;
    const headerClass = classNames({
      disabled: attendance === false
    });

    let colours = ["#66c279", "#fe737b"];
    let data = [{ x: present, y: present }, { x: absent, y: absent }];

    if (!attendance) {
      colours = ["#ccc", "#efefef"];
      data = [{ x: 50, y: 50 }, { x: 50, y: 50 }];
    }

    return (
      <div className="pie-chart">
        <h2 className={headerClass}>Overall Attendance</h2>
        <VictoryPie
          animate={{
            duration: 1000,
            onEnd: () => {
              //console.log("end", location);
            }
          }}
          colorScale={colours}
          labelRadius={80}
          labels={datum => String(Math.round(datum.x)) + " %"}
          style={{
            labels: { fill: "white", fontSize: 18, fontWeight: "bold" }
          }}
          data={data}
        />
      </div>
    );
  }
}

export default OverallAttendance;
