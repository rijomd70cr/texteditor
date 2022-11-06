import React, { useState } from 'react';
import { FaBold } from 'react-icons/fa';
import { AiOutlineUnderline, AiOutlineItalic, AiOutlineUnorderedList, AiOutlineOrderedList } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';

export default function Header(props) {
    const { onClick } = props;
    const [isboldtrue, setboldTrue] = useState(false);

    return (
        <div className='header'>
            <p onClick={(e) => { setboldTrue(!isboldtrue); onClick(e, "bold") }}>  <FaBold style={{ color: isboldtrue ? "blue" : "black" }} /> </p>
            <p> <AiOutlineUnderline /></p>
            <p><AiOutlineItalic /></p>
            <p><AiOutlineOrderedList /></p>
            <p><AiOutlineUnorderedList /></p>
            <p onClick={(e)=>{onClick(e,"table")}}><BsTable /></p>
        </div>
    )
}
