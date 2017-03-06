class CalendarControler extends React.Component {

    render() {
        return <div
            style={{flexDirection: "row", display: "flex", width: this.props.width, justifyContent: "space-between"}}>
            <button onClick={this.reduceMonth.bind(this)}>-</button>
            <span>
                {`${this.props.date.getFullYear()}-${this.props.date.getMonth() + 1}`}
            </span>
            <button onClick={this.addMonth.bind(this)}>+</button>
        </div>
    }

    addMonth() {
        let newYear = this.props.date.getFullYear();
        let newMonth = this.props.date.getMonth() + 1;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        this.props.onChangeDate(new Date(newYear, newMonth))
    }

    reduceMonth() {
        let newYear = this.props.date.getFullYear();
        let newMonth = this.props.date.getMonth() - 1;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        this.props.onChangeDate(new Date(newYear, newMonth))
    }
}
class CalendarWeekBar extends React.Component {

    constructor(props) {
        super(props);
        this.weekDayList = ["日", "一", "二", "三", "四", "五", "六"]
    }

    render() {
        return <div
            style={{
                height: 30,
                backgroundColor: "#f7ffd6",
                flexDirection: "row",
                display: "flex",
                alignItems: "stretch",
            }}>
            {this.weekDayList.map(function (it) {
                return <div style={{flex: 1, backgroundColor: "#d1d9ff"}} key={it}>{it}</div>
            })}
        </div>
    }
}

class CalendarDayItem extends React.Component {

    render() {
        return <div style={{
            width: this.props.size,
            height: this.props.size,
            cursor: "pointer",
            marginLeft: this.props.data.leftIndent
        }} onClick={this.onClick.bind(this)}>
            <span>{this.props.data.text}</span>
        </div>
    }

    onClick() {
        let date = this.props.data.date;
        alert(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    }
}

class CalendarContent extends React.Component {
    constructor(props) {
        super(props);
        this.itemWidth = Math.floor(this.props.width / 7)
    }

    render() {
        return <div style={{display: "flex", flexWrap: "wrap"}}>
            {this.renderCalendarItem()}
        </div>
    }

    renderCalendarItem() {
        let itemList = [];
        let now = this.props.date;
        let dayNumOfMount = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= dayNumOfMount; i++) {
            let date = new Date(now.getFullYear(), now.getMonth(), i);
            let leftIndent = 0;
            if (i == 1) {
                leftIndent = this.itemWidth * date.getDay();
            }
            itemList.push({
                date: date,
                leftIndent: leftIndent,
                text: i
            })
        }
        return itemList.map(function (it, index) {
            return <CalendarDayItem size={this.itemWidth} data={it} key={index}/>
        }.bind(this))
    }
}

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
        let date = new Date(parseInt(this.props.year), parseInt(this.props.month - 1));
        this.state = {
            date: date
        }
    }

    render() {
        return <div style={this.props.style}>
            <CalendarControler width={this.props.style.width} date={this.state.date}
                               onChangeDate={this.onChangeDate.bind(this)}/>
            <CalendarWeekBar/>
            <CalendarContent width={this.props.style.width} date={this.state.date}/>
        </div>
    }

    onChangeDate(date) {
        this.setState({date: date})
    }

}

ReactDOM.render(
    <CalendarView style={{width: 300, backgroundColor: "#eefff6"}} year="2017" month="4"/>,
    document.getElementById("root")
);
