import React from 'react';
import '../Menus/Menu.css';
import { CheckBox } from '../CheckBox/CheckBox';

export const Menu = ({onSelect, selected, id}) => {
  return (
    <div id={id}>
        <ul id='iconContainer' className='commonStyleContainer'>
            <CheckBox label='Experience' className='commonCBstyle' checked={selected} onChange={onSelect}/>
            <CheckBox label='Qualification' className='commonCBstyle'/>
            <CheckBox label='Departments' className='commonCBstyle'/>
            <CheckBox label='Salary Range' className='commonCBstyle'/>
        </ul>
    </div>
  )
}
