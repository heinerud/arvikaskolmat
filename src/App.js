import React, { Component } from 'react';

let api = 'https://arvikaskolmat-api.herokuapp.com';

function dayOfWeek(dateStr) {
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
  let date = new Date(dateStr)
  let dayIndex = date.getDay()
  return days[Number(dayIndex) - 1]
}

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
}

function date2Week(dateStr) {
  let date = new Date(dateStr)
  return date.getWeek()
}

class Day extends Component {
  render() {
    return (
      <div style={{ marginLeft: '1%' }}>
        <h2>{this.props.date}</h2>
        <h3 style={{ marginLeft: '3%' }}>{this.props.dish}</h3>
      </div >
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      menu: null,
    }
  }
  componentDidMount() {
    fetch(api + '/school')
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        menu: data.menu
      }))
  }

  render() {
    let now = new Date()
    let currentWeek = date2Week(now)
    let daysToRender =
      this.state.menu ?
        this.state.menu
          .filter(menuItem => date2Week(menuItem.date) === currentWeek)
        : []

    return (
      <div className="App">
        {this.state.title ?
          <div>
            <h1 style={{ marginLeft: '1%' }}>{this.state.title}</h1>
            {daysToRender.map((x, i) => <Day date={dayOfWeek(x.date)} dish={x.dish} key={i} />)}
          </div>
          : <div><h1>Loading...</h1></div>
        }
      </div>
    );
  }
}

export default App;
