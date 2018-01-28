import * as React from 'react';
import * as Utils from '../utils';
import * as App from '../App';

interface Props {
    drawsAPI: string;
    drawsURL: string;
    queryParams: App.QueryParams;
}

interface Draw {
    name: string;
    ctime: Date;
}

interface State {
    store: {
        draws: Draw[];
    };
}

class Draws extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.props = { ...props };
        this.state = {
            store: {
                draws: []
            },
        };
    }

    fetchDraws() {
        Utils.makeJSONRequest({
            method: 'GET',
            url: this.props.drawsAPI + '/draws',
            params: { ...this.props.queryParams } as Utils.ParamObject,
        }).then((respJSON) => {
            const resp = JSON.parse(respJSON);
            const newStore = { ...this.state.store };
            newStore.draws = resp.draws;
            this.setState({
                store: newStore
            });
        });
    }

    componentDidMount() {
        this.fetchDraws();
    }

    render() {
        const drawComponents = this.state.store.draws.map((draw) => {
            // TODO: what is key for in array html elements???
            return (
                <div key="owowhatsthis">
                    <img src={this.props.drawsURL + '/' + draw.name} alt={draw.name} />
                </div>
            );
        });

        return (
            <div className="draws flex-container">
                {drawComponents}
            </div>
        );
    }
}

export {
    Draws,
};