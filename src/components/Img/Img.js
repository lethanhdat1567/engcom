import { forwardRef } from 'react';
import imgs from '~/assets/Image';

import { useState } from 'react';

function Img({ src, alt, className, ...props }, ref) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(imgs.unsetAvatar);
    };

    return (
        <img
            className={className}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
}

export default forwardRef(Img);
