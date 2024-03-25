// import React, { useState, useEffect } from 'react';
// import Style from '../Popup/Popup.module.css';
// import { Text } from '../Text/Text';

// export const Popup = ({ isSuccess, content }) => {
//     const [isVisible, setIsVisible] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsVisible(false);
//         }, 5000); // Hide popup after 5 seconds

//         return () => clearTimeout(timer);
//     }, []);

//     const containerClass = isVisible ? `${Style.popupContainer} ${Style.slidein}` : `${Style.popupContainer} ${Style.slideout}`;

//     const style = {
//         background: isSuccess ? "#4188FF" : "red"
//     }

//     return (
//         <div className={containerClass}>
//             <div id={Style.iconDiv} style={style}><i className={isSuccess ? "fa-solid fa-check" : "fa-solid fa-exclamation"}></i></div>
//             <Text id={Style.contentDiv}>{content}</Text>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import Style from '../Popup/Popup.module.css';
import { Text } from '../Text/Text';

export const Popup = ({ isSuccess, content, mainId }) => {
    const [isVisible, setIsVisible] = useState(true);

    const style = {
        background: isSuccess ? "#4188FF" : "red"
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000); // Hide popup after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const containerClass = isVisible ? `${Style.popupContainer} ${Style.slidein}` : `${Style.popupContainer} ${Style.slideout}`;

    return (
        <div id={mainId} className={`${containerClass} ${Style.popupContainer}`}>
            <div id={Style.iconDiv} style={style}><i class={isSuccess ? "fa-solid fa-check" : "fa-solid fa-exclamation"}></i></div>
            <Text id={Style.contentDiv}>{content}</Text>
        </div>
    )
}

