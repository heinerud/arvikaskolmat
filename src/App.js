import React, { Component } from 'react';

function dayOfWeek(dateNumber) {
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
  let date = new Date(dateNumber)
  let dayIndex = date.getDay()
  return days[Number(dayIndex) - 1]
}

class Day extends Component {
  render() {
    let divStyle = {
      marginLeft: '1%',
      marginRight: '1%'
    }
    let menuStyle = {
      marginLeft: '3%',
      marginRight: '3%'
    }

    return (
      <div style={divStyle}>
        <h2>{this.props.day}</h2>
        <h3 style={menuStyle}>{this.props.dish}</h3>
      </div >
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWeek: null,
      menu: null,
    }
  }
  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(res => this.setState({
        currentWeek: res.CurrentWeek,
        title: res.Weeks
          .filter(x => x.WeekNumber === res.CurrentWeek)[0].MenuName,
        menu: res.Weeks
          .filter(x => x.WeekNumber === res.CurrentWeek)[0].Days
          .map(x => x.DayMenus[0])
          .map(x => x.MenuPresentation)
          .map(x => {
            return {
              day: dayOfWeek(Number(x.DayMenuDate)),
              info: x.DayMenuInfo,
              dish: x.DayMenuName,
            }
          })
      }))
      .then(x => console.log(this.state))
  }

  render() {
    let menu = this.state.menu ?
      this.state.menu.map(x => {
        let day = x.info.length > 0 ? x.day + ' (' + x.info + ')' : x.day
        return { day: day, dish: x.dish }
      }) : []
    let title = this.state.title ? this.state.title + ' (v. ' + this.state.currentWeek + ')' : ''
    let h1Style = {
      marginLeft: '1%',
      marginRight: '1%',
    }

    return (
      <div className="App">
        {this.state.menu ?
          <div>
            <h1 style={h1Style}>{title}</h1>
            {menu.map((x, i) => <Day day={x.day} dish={x.dish} key={i} />)}
          </div>
          : <div><h1 style={h1Style}>Fetching menu...</h1></div>
        }
      </div>
    );
  }
}

export default App;
