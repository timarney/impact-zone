import React, { Component } from "react";
import CheckIn from "./Checkin";
import Settings from "./Settings";
import { Manager, Target, Popper } from "react-popper";
import { Tooltip } from "./Tooltip";
import Aux from "react-aux";

class Box extends Component {
  state = {};
  render() {
    const { item, locationId, date, active, onClick } = this.props;
    const placement = "left";
    return (
      <Manager key={item.id}>
        <div className="person attendance-person">
          <CheckIn item={item} locationId={locationId} date={date} />
          <div className="name">{item.name}</div>
          <Target>
            <Settings item={item} onClick={onClick} />
          </Target>
        </div>

        {item.id === active && (
          <Aux>
            <Popper placement={placement}>
              {({ popperProps = false }) => (
                <Tooltip popperProps={popperProps}>
                  <div className="menu">
                    <div>
                      <a href="#">Menu Item 1</a>
                    </div>
                    <div>
                      <a href="#">Menu Item 2</a>
                    </div>
                    <div>
                      <a href="#">Menu Item 3</a>
                    </div>
                    <div>
                      <a href="#">Menu Item 4</a>
                    </div>
                    <div>
                      <a href="#">Menu Item 5</a>
                    </div>
                  </div>
                </Tooltip>
              )}
            </Popper>

            {/*  <div className="__overlay"></div> */}
          </Aux>
        )}
      </Manager>
    );
  }
}

export default Box;
