import React from 'react'
import { SpinnerCircular } from 'spinners-react';
import _colors from '../../_colors';

export default function Loader({ className }) {
    return (
        <div className={`flex justify-center ${className}`}>
            <SpinnerCircular
                size={74}
                thickness={180}
                speed={136}
                color={_colors.orangeColor}
                secondaryColor="rgba(0, 0, 0, 0.44)"
            />
        </div>
    )
}
