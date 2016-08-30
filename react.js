var Main = React.createClass({
    displayName: "Main",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div", {
                    className: "row"
                },
                React.createElement(
                    "div", {
                        className: "col s12 m10 offset-m1"
                    },
                    React.createElement(
                        "h1", {
                            className: "center-align"
                        },
                        React.createElement("i", {
                            className: "fa fa-lg fa-trophy trophy"
                        })
                    ),
                    React.createElement(
                        "h1", {
                            className: "center-align lead"
                        },
                        "Scores"
                    ),
                    React.createElement(TableWrap, null)
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

var TableWrap = React.createClass({
    displayName: "TableWrap",

    getInitialState: function getInitialState() {
        return {
            data: [],
            loading: true,
            recent: "",
            all: "fa fa-arrow-circle-down"
        };
    },

    componentDidMount: function componentDidMount() {
        $.ajax({
            url: "score/total/total.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    data: data,
                    loading: false
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },

    _getAll: function _getAll(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.serverRequest = $.get("score/total/total.json", function (result) {
            this.setState({
                data: result,
                loading: false,
                recent: "",
                all: "fa fa-arrow-circle-down"
            });
        }.bind(this));
    },

    _getRecent: function _getRecent(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.serverRequest = $.get("score/parcial.json", function (result) {
            this.setState({
                data: result,
                loading: false,
                recent: "fa fa-arrow-circle-down",
                all: ""
            });
        }.bind(this));
    },

    render: function render() {
        var boundClickRec = this._getRecent.bind(this);
        var boundClickAll = this._getAll.bind(this);
        var loading = undefined;
        if (this.state.loading) {
            loading = React.createElement(Loading, null);
        } else {
            loading = false;
        }
        return React.createElement(
            "div",
            null,
            loading,
            React.createElement(Table, {
                data: this.state.data,
                clickRecent: boundClickRec,
                clickAll: boundClickAll,
                recentHead: this.state.recent,
                allHead: this.state.all
            })
        );
    }
});

var Table = React.createClass({
    displayName: "Table",

    render: function render() {
        var tableRows = this.props.data.map(function (user, index) {
            return React.createElement(Row, {
                rank: index + 1,
                username: user.username,
                img: user.img,
                all: user.alltime,
                recent: user.recent
            });
        });
        return React.createElement(
            "table", {
                className: "highlight"
            },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement("th", {
                        width: "10%",
                        "data-field": "id"
                    }),
                    React.createElement(
                        "th", {
                            width: "70px",
                            "data-field": "name"
                        },
                        "Alumno"
                    ),
                    React.createElement("th", {
                        "data-field": "name"
                    }),
                    React.createElement(
                        "th", {
                            width: "20%",
                            "data-field": "days",
                            className: "center-align"
                        },
                        React.createElement(
                            "a", {
                                href: "#",
                                onClick: this.props.clickRecent
                            },
                            "última clase ",
                            React.createElement("i", {
                                className: this.props.recentHead
                            })
                        )
                    ),
                    React.createElement(
                        "th", {
                            width: "20%",
                            "data-field": "all",
                            className: "center-align"
                        },
                        React.createElement(
                            "a", {
                                href: "#",
                                onClick: this.props.clickAll
                            },
                            "Total ",
                            React.createElement("i", {
                                className: this.props.allHead
                            })
                        )
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                tableRows
            )
        );
    }
});

var Row = React.createClass({
    displayName: "Row",

    render: function render() {
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td", {
                    className: "center-align"
                },
                this.props.rank
            ),
            React.createElement(
                "td", {
                    className: "img-cell"
                },
                React.createElement("img", {
                    className: "responsive-img",
                    src: this.props.img
                })
            ),
            React.createElement(
                "td",
                null,
                this.props.username
            ),
            React.createElement(
                "td", {
                    className: "center-align"
                },
                this.props.recent
            ),
            React.createElement(
                "td", {
                    className: "center-align"
                },
                this.props.all
            )
        );
    }
});

var Loading = React.createClass({
    displayName: "Loading",

    render: function render() {
        return React.createElement(
            "div", {
                className: "center-align"
            },
            React.createElement("i", {
                className: "fa fa-refresh fa-spin fa-fw"
            }),
            " Cargando..."
        );
    }
});

var Footer = React.createClass({
    displayName: "Footer",

    render: function render() {
        return React.createElement(
            "div", {
                className: "center-align footer-text"
            },
            "Desarrollado por ",
            React.createElement(
                "a", {
                    href: "http://arkev.com"
                },
                "Arkev"
            ),
            " usando ReactJS"
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('content'));