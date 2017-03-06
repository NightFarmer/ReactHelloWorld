class LeftBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folderList: [],
        };
        this.selectedFolder = null;
    }

    render() {
        return <div className="left-bar">
            <div className="left-bar-list">
                <ul>
                    {this.state.folderList.map(function (it) {
                        return <li key={it.id} onClick={function () {
                            this.selectedFolder = it;
                            this.props.onFolderSelected(it)
                        }.bind(this)}>{it.name}</li>
                    }.bind(this))}
                </ul>
            </div>
            <div className="drag-line"/>
        </div>
    }

    componentDidMount() {
        this.getFolderList()
    }

    getFolderList() {
        let folderList = [];
        for (let i = 0; i < 100; i++) {
            folderList.push({
                name: `文件夹${i}`,
                id: i
            })
        }
        this.setState({folderList: folderList})
    }
}

class FileManagerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    render() {
        return <div className="file-manger-list">
            <div className="left-bar-list">
                <ul>
                    {this.state.fileList.map(function (it) {
                        return <li key={it.id} onClick={function () {
                            this.selectedFolder = it;
                            this.props.onFileSelected(it)
                        }.bind(this)}>{it.name}</li>
                    }.bind(this))}
                </ul>
            </div>
            <div className="drag-line"/>
        </div>
    }

    setCurrentFolder(folder) {
        let fileList = [];
        if (!folder) return fileList;
        for (let i = 0; i < 100; i++) {
            fileList.push({
                name: `${folder.name}/文件夹${i}`,
                id: i
            })
        }
        this.setState({fileList: fileList})
    }
}

class ManagerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.currentFile = null;
        this.state = {
            content: ""
        };
    }

    render() {
        return <div className="file-manger-container">
            <FileManagerList ref="fileListComp" {...this.props} onFileSelected={this.onFileSelected.bind(this)}/>
            <div className="file-manger-detail">
                <textarea className="file-manger-detail-text" ref="fileDetailComp" onInput={this.onInput.bind(this)}
                          value={this.state.content}/>
            </div>
        </div>
    }

    onInput(event) {
        let value = event.nativeEvent.target.value;
        this.currentFile.content = value;
        this.setState({content: value})
    }

    getFileContent() {
        if (this.currentFile) {
            if (this.currentFile.content) {
                return this.currentFile.content
            }
            return `文件-${this.currentFile.name}的内容`
        }
    }

    onFileSelected(itemObj) {
        this.currentFile = itemObj;
        let value = this.getFileContent();
        if (!value) value = '';
        this.setState({content: value})
    }

    setCurrentFolder(itemObj) {
        this.refs.fileListComp.setCurrentFolder(itemObj)
    }
}

class ContentComponent extends React.Component {

    render() {
        return <div className="content">
            <LeftBarComponent onFolderSelected={this.onFolderSelected.bind(this)}/>
            <ManagerContainer ref="container"/>
        </div>
    }

    onFolderSelected(itemObj) {
        this.refs.container.setCurrentFolder(itemObj)
    }
}

class DemoContent extends React.Component {

    render() {
        return <div>
            <div className="top-bar"></div>
            <ContentComponent/>
        </div>
    }

}


ReactDOM.render(
    <DemoContent/>,
    document.getElementById('root')
);