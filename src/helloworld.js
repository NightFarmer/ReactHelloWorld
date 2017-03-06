let Divider = React.createClass({
    defaultValue: "默认值",

    render: function () {
        return (
            <div>
                <h1>111</h1>
                <h1>{this.defaultValue}</h1>
            </div>
        )
    }

});

class DateLabel extends React.Component {

    currentDateParser() {
        let now = new Date();
        return [now.getFullYear(), now.getMonth(), now.getDate()].join("-")
    }

    render() {
        return <p>{this.props.label}{this.currentDateParser()}</p>
    }
}

class D2 extends React.Component {
    constructor(props) {
        super(props);
        this.defaultValue = "默认值";
        this.state = {
            myInputValue: this.defaultValue.split("").join("#")
        }
    }

    testFunction() {
        let result = 1 + 2;
        return `testFunctionResult: ${result}`
    }

    render() {
        return (
            <div>
                <h1 style={{backgroundColor: "#f7e6ff"}}>{this.defaultValue}</h1>
                <h2 className="test-class">{this.testFunction()}</h2>
                <DateLabel label="日期："/>
                <input ref="myInput" onInput={this.onMyInputChange.bind(this)}/>
                <p onClick={this.onTest.bind(this)}>{this.state.myInputValue}</p>
            </div>
        )
    }

    componentDidMount() {
        this.refs.myInput.value = this.defaultValue
    }

    onMyInputChange(event) {
        let value = event.nativeEvent.target.value;
        this.setState({myInputValue: value.split("").join("#")})
    }

    onTest() {
        fetch("src/hehe.json")
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                console.info(json.name)
            })
    }
}


ReactDOM.render(
    <D2>Hello, world!</D2>,
    document.getElementById('root')
);
