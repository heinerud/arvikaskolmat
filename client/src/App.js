import React, { Component } from 'react';

const margins = {
  marginLeft: '15px',
  marginRight: '15px',
};
const normalFont = { fontWeight: 'normal' };

function dayOfWeek(dateNumber) {
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
  let date = new Date(dateNumber);
  let dayIndex = date.getDay();
  return days[dayIndex - 1];
}

class Day extends Component {
  render() {
    let dishStyle = {
      marginLeft: '15px',
      marginTop: '0px',
      marginBottom: '0px',
      fontWeight: 'normal',
    };
    const today = new Date();
    let dayMillis = 3600 * 24 * 1000;
    let dayHasPassed = today > new Date(this.props.date + dayMillis);
    let fontColor = dayHasPassed ? 'gray' : 'black';

    return (
      <div style={{ margins, color: fontColor }}>
        <h3 style={{ fontWeight: 'normal', marginBottom: '5px' }}>
          {this.props.day}
        </h3>
        {this.props.dishes.map((x, i) => (
          <p style={dishStyle} key={i}>
            {' ☞ ' + x}
          </p>
        ))}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWeek: null,
      menu: null,
    };
  }

  fetchMenuData = () => {
    fetch(this.props.url)
      .then(res => res.json())
      .then(res =>
        this.setState({
          currentWeek: res.CurrentWeek,
          title: res.Weeks.filter(x => x.WeekNumber === res.CurrentWeek)[0]
            .MenuName,
          menu: res.Weeks.filter(x => x.WeekNumber === res.CurrentWeek)[0]
            .Days.map(x => x.DayMenus)
            .map(x => x.map(x => x.MenuPresentation))
            .map(x => {
              return {
                date: x[0].DayMenuDate,
                info: x[0].DayMenuInfo,
                dishes: x.map(x =>
                  x.DayMenuName.replace(/, /g, ',').replace(/,/g, ', ')
                ),
              };
            }),
        })
      )
      .then(x => console.log(this.state));
  };

  componentDidMount() {
    this.fetchMenuData();
    setInterval(this.fetchMenuData, 1000 * 60 * 20);
  }

  render() {
    let menu = this.state.menu
      ? this.state.menu.map(x => {
          let dayName = dayOfWeek(x.date);
          let day = x.info.length > 0 ? dayName + ' (' + x.info + ')' : dayName;
          return { date: x.date, dishes: x.dishes, day: day };
        })
      : [];
    let title = this.state.title
      ? this.state.title + ' (v. ' + this.state.currentWeek + ')'
      : '';

    return (
      <div className="App">
        {this.state.menu ? (
          <div style={margins}>
            <h2 style={normalFont}>{title}</h2>
            {menu.map((x, i) => (
              <Day day={x.day} date={x.date} dishes={x.dishes} key={i} />
            ))}
          </div>
        ) : (
          <div style={margins}>
            <h2 style={normalFont}>Fetching menu...</h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;
