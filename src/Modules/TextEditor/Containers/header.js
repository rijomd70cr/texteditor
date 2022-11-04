import React from 'react';
import { FaBold } from 'react-icons/fa';
import { AiOutlineUnderline, AiOutlineItalic, AiOutlineUnorderedList, AiOutlineOrderedList } from 'react-icons/ai';

export default function Header() {
    return (
        <div className='header'>
            <p>  <FaBold /> </p>
            <p> <AiOutlineUnderline /></p>
            <p><AiOutlineItalic /></p>
            <p><AiOutlineOrderedList /></p>
            <p><AiOutlineUnorderedList /></p>
        </div>
    )
}
