import React, { Component, createContext } from "react";
import ReactDOM from "react-dom";

const style = {
  padding: "20px",
  color: "#fff",
  fontWeight: 700
};

const AppContext = createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log(props);
  }

  handleChange(e) {
    this.setState({ [`${e.target.name}`]: e.target.value });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <input
          type="number"
          name="number"
          value={this.state.number}
          onChange={e => this.handleChange(e)}
        />
        <hr />
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const Blue = ({ number }) => {
  return (
    <div style={{ ...style, backgroundColor: "blue" }}>
      <AppContext.Consumer>{context => context.number}</AppContext.Consumer>
    </div>
  );
};

const Green = ({ number }) => {
  return (
    <div style={{ ...style, backgroundColor: "green" }}>
      <Blue number={number} />
    </div>
  );
};

class Red extends Component {
  render() {
    return (
      <AppProvider>
        <div style={{ ...style, backgroundColor: "red" }}>
          <AppContext.Consumer>{context => context.number}</AppContext.Consumer>
          <Green />
        </div>
      </AppProvider>
    );
  }
}

ReactDOM.render(<Red />, document.getElementById("root"));
