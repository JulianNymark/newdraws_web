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
            // TODO: generate unique 'key' for react? (prevent re-rendering hiccups?)
            const thumbFileName = draw.name.replace(/\.(png|gif)$/, '.jpg');
            const thumbImgSrc = this.props.store.drawsURL + '/thumbnails/' + thumbFileName;
            return (
                <div key="owowhatsthis">
                    <a href={this.props.store.drawsURL + '/' + draw.name}>
                        <img src={thumbImgSrc} alt={draw.name} />
                    </a>
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