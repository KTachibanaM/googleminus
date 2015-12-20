var KeywordRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.config.keyword}</td>
                <td>{this.props.config.filtering_mode}</td>
                <td>{this.props.config.param}</td>
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
        var lines = this.state.configs.map(function (config) {
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
                {lines}
            </table>
        )
    }
});

var configs = get_keyword_configs();

ReactDOM.render(
    <KeywordTable configs={configs}/>,
    document.getElementById('app')
);