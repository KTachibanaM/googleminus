var KeywordRow = React.createClass({
    handleParamChange: function (e) {
        var new_param = e.target.value;
        this.props.changeHandler(this.props.config.keyword, this.props.config.filtering_mode, new_param);
    },
    handleFilteringModeChange: function (e) {
        var new_filtering_mode = e.target.value;
        this.props.changeHandler(this.props.config.keyword, new_filtering_mode, this.props.config.param);
    },
    handleDelete: function () {
        this.props.deleteHandler(this.props.config.keyword);
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.config.keyword}</td>
                <td>
                    <select
                        className="form-control"
                        defaultValue={this.props.config.filtering_mode}
                        onChange={this.handleFilteringModeChange}>
                        {this.props.filteringModeOptions}
                    </select>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.props.config.param}
                        onChange={this.handleParamChange}/>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
});

var KeywordTable = React.createClass({
    getInitialState: function () {
        return {
            configs: this.props.configs,
            new_keyword: "",
            new_filtering_mode: FILTERING_MODES[0],
            new_param: ""
        };
    },
    handleChange: function (keyword, filtering_mode, param) {
        modify_keyword_config(keyword, filtering_mode, param);
    },
    handleDelete: function (keyword) {
        remove_keyword_config(keyword);

        var new_state = this.state;
        var index = -1;
        new_state.configs.forEach(function (config, i) {
            if (config.keyword === keyword) {
                index = i;
            }
        });
        if (index !== -1) {
            new_state.configs.splice(index, 1);
        }
        this.setState(new_state);
    },
    handleNewKeywordChange: function (e) {
        var new_state = this.state;
        new_state.new_keyword = e.target.value;
        this.setState(new_state);
    },
    handleNewFilteringModeChange: function (e) {
        var new_state = this.state;
        new_state.new_filtering_mode = e.target.value;
        this.setState(new_state);
    },
    handleNewParamChange: function (e) {
        var new_state = this.state;
        new_state.new_param = e.target.value;
        this.setState(new_state);
    },
    handleAdd: function () {
        var new_state = this.state;
        if (!check_keyword_config_exists(this.state.new_keyword)) {
            var new_config = new KeywordConfig(this.state.new_keyword, this.state.new_filtering_mode, this.state.new_param);
            add_keyword_config(new_config);

            new_state.configs.push(new_config);
            new_state.new_keyword = "";
            new_state.new_filtering_mode = FILTERING_MODES[0];
            new_state.new_param = "";
            this.setState(new_state);
        } else {
            alert("Keyword " + this.state.new_keyword + " exists!");

            new_state.new_keyword = "";
            this.setState(new_state);
        }
    },
    render: function () {
        var filtering_mode_options = FILTERING_MODES.map(function (filtering_mode) {
            return (
                <option key={filtering_mode} value={filtering_mode}>{filtering_mode}</option>
            );
        });
        var rootContext = this;
        var rows = this.state.configs.map(function (config) {
            return <KeywordRow
                        key={config.keyword}
                        config={config}
                        filteringModeOptions={filtering_mode_options}
                        changeHandler={rootContext.handleChange}
                        deleteHandler={rootContext.handleDelete}/>
        });
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>RegEx</th>
                        <th>Filtering mode</th>
                        <th>Parameter</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.new_keyword}
                                placeholder="New RegEx"
                                onChange={this.handleNewKeywordChange}/>
                        </td>
                        <td>
                            <select
                                className="form-control"
                                value={this.state.new_filtering_mode}
                                onChange={this.handleNewFilteringModeChange}>
                                {filtering_mode_options}
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.new_param}
                                onChange={this.handleNewParamChange}/>
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={this.handleAdd}>Add</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
});

var configs = get_keyword_configs();

ReactDOM.render(
    <KeywordTable configs={configs}/>,
    document.getElementById('app')
);