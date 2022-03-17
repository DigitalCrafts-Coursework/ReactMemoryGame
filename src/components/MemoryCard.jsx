import React from "react";
import "./MemoryCard.css";

class MemoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  render() {
    return (
      <div className="MemoryCard" onClick={this.props.pickCard}>
        <div
          className={`MemoryCardInner ${this.props.isFlipped ? "flipped" : ""}`}
        >
          <div className="MemoryCardFront">{this.props.symbol}</div>
          <div className="MemoryCardBack">
            <img
              src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryCard;
