import * as React from 'react';

interface Props {
    name: string;
    enthusiasmLevel: number;
}

function getExclamationMarks(value: number) {
    return ''.padStart(value, '!');
}

class Test extends React.Component<Props, object> {
    render() {
        const { name, enthusiasmLevel = 1 } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="test">
                <div className="greeting">
                    Test {name + getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        );
    }
}

export {
    Test,
};