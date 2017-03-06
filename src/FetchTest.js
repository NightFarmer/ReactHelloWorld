class DemoContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: ""
        }
    }

    render() {
        return <div>
            <button onClick={this.onBtnClick.bind(this)} value={'hehe'} name="123">12333</button>
            <div>请求结果：{this.state.result}</div>
        </div>
    }

    onBtnClick() {
        let self = this;
        fetch('src/hehe.json')
            .then(function (response) {
                return response.json()
            })
            .then(function (jsonObj) {
                console.info(jsonObj.name);
                self.setState({result: jsonObj.name})
            })
    }
}

ReactDOM.render(
    <DemoContent/>,
    document.getElementById('root')
);