import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ZoomImage({
                                      id,
                                      width = '700px',
                                      alt = '',
                                      style = {},
                                      ...props
                                  }) {
    const defaultStyle = {
        border: '1px solid #727272',
        width: width,
        display: 'block',
        margin: '20px auto',
        ...style
    };

    return (
        <Zoom>
            <img
                src={require(`@site/versioned_docs/version-3.0/img/${id}`).default}
                alt={alt}
                style={defaultStyle}
                {...props}
            />
        </Zoom>
    );
}