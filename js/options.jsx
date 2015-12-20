var KeywordRow = React.createClass({
    render: function () {
        var filtering_mode_options = FILTERING_MODES.map(function (filtering_mode) {
            return (
                <option value={filtering_mode}>{filtering_mode}</option>
            );
        });
        return (
            <tr>
                <td>{this.props.config.keyword}</td>
                <td>
                    <select value={this.props.config.filtering_mode}>
                        {filtering_mode_options}
                    </select>
                </td>
                <td>
                    <input type="text" default={this.props.config.param}/>
                </td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
        )
    }
});

var KeywordTable = React.createClass({
    getInitialState: function () {
        return {
            configs: this.props.configs
        };
    },
    render: function () {
        var rows = this.state.configs.map(function (config) {
            return <KeywordRow config={config}/>
        });
        return (
            <table>
                <tr>
                    <th>Keyword</th>
                    <th>Filtering mode</th>
                    <th>Parameter</th>
                    <th>Action</th>
                </tr>
                {rows}
            </table>
        )
    }
});

var configs = get_keyword_configs();

ReactDOM.render(
    <KeywordTable configs={configs}/>,
    document.getElementById('app')
);