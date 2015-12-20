var KeywordRow = React.createClass({
    handleParamChange: function (e) {
        var new_param = e.target.value;
        this.props.changeHandler(this.props.config.keyword, this.props.config.filtering_mode, new_param);
    },
    handleFilteringModeChange: function (e) {
        var new_filtering_mode = e.target.value;
        this.props.changeHandler(this.props.config.keyword, new_filtering_mode, this.props.config.param);
    },
    render: function () {
        var filtering_mode_options = FILTERING_MODES.map(function (filtering_mode) {
            return (
                <option key={filtering_mode} value={filtering_mode}>{filtering_mode}</option>
            );
        });
        return (
            <tr>
                <td>{this.props.config.keyword}</td>
                <td>
                    <select
                        defaultValue={this.props.config.filtering_mode}
                        onChange={this.handleFilteringModeChange}>
                        {filtering_mode_options}
                    </select>
                </td>
                <td>
                    <input type="text"
                           defaultValue={this.props.config.param}
                           onChange={this.handleParamChange}/>
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
    handleChange: function (keyword, filtering_mode, param) {
        modify_keyword_config(keyword, filtering_mode, param);
    },
    render: function () {
        var rootContext = this;
        var rows = this.state.configs.map(function (config) {
            return <KeywordRow key={config.keyword} config={config} changeHandler={rootContext.handleChange}/>
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Keyword</th>
                        <th>Filtering mode</th>
                        <th>Parameter</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
});

var configs = get_keyword_configs();

ReactDOM.render(
    <KeywordTable configs={configs}/>,
    document.getElementById('app')
);