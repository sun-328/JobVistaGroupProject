import React from 'react';
import { Image } from '../ImageTag/Image';
import { Text } from '../Text/Text';
import Style from '../NoRecord/NoRecord.module.css';

export const NoRecord = ({content}) => {
  return (
    <div id={Style.noRecordContainer}>
        <Image src='../../../public/Images/no-records.png'></Image>
        <Text>{content}</Text>
    </div>
  )
}
