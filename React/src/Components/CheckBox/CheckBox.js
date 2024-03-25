import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';

export const CheckBox = ({label, className}) => {
    const [selectCheckBox, setSelectCheckBox] = useState(false);

    const selectJobs = () => {
        setSelectCheckBox(!selectCheckBox);
    }

    return (
        <li className={className}>
            <Input checked={selectCheckBox} onChange={selectJobs} type='checkbox'/>
            <Text>{label}</Text>
        </li>
    )
}
