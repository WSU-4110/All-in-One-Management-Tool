import React, { useEffect, useState } from 'react';

// Copied and pasted from stack overflow with slight modifications
function Expire(props) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsVisible(false), props.delay);
    }, [props.delay]);

    return (
        isVisible
            ? <div>{props.children}</div>
            : <span />
    );
}

export default Expire;