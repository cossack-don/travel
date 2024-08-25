import * as React from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '../feat/counter/Counter';
export default function One() {
    return (
        <div>
            <Counter/>
            Start <Link to="/one">one</Link>
        </div>
    );
}
