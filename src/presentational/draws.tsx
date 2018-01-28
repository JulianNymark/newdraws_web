import * as React from 'react';
import { Store } from '../types';

interface Props {
    store: Store;
}

class Draws extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const drawComponents = this.props.store.draws.map((draw) => {
            // TODO: what is key for in array html elements???
            return (
                <div key="owowhatsthis">
                    <img src={this.props.store.drawsURL + '/' + draw.name} alt={draw.name} />
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