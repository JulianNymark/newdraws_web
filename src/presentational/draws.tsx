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
            const thumbFileName = draw.name.replace(/\.png$/, '.jpg');
            const thumbImgSrc = this.props.store.drawsURL + '/thumbnails/' + thumbFileName;
            return (
                <div key="owowhatsthis">
                    <img src={thumbImgSrc} alt={draw.name} />
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