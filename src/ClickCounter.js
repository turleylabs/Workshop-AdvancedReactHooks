import * as React from 'react'

function CountDisplay(props) {
    return (
        <div>{`The current count is ${props.count}`}</div>
    );
}

function Counter(props) {
    const increment = () => props.setCount(c => c + 1)
    return (
        <button onClick={increment}>Increment count</button>
    );
}

export function ClickCounter() {
    const [count, setCount] = React.useState(0);

    return (
        <>
            <CountDisplay count={count} />
            <Counter setCount={setCount} />
        </>
    );
}

