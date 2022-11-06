import React, { useState, useCallback } from 'react';

import Button from '../../../Components/Button/index';
import EditorHeader from '../Components/editorHeader';
import Header from './header';

import { convertToRaw, EditorState, Modifier, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../Style/editor.css';





export default function TextEditor() {

  const [message, setMessage] = useState();
  const [isShow, setShow] = useState(false);
  const [openraws, openRawColumn] = useState(false);
  const [openTable, setOpentable] = useState(false);
  const [datas, setDatas] = useState({
    row: '',
    column: ''
  });
  const textarea = document.getElementById("textarea")
 
  const showDraft = () => {
    setShow(!isShow);
  }

  const rendercolumns = () => {
    console.log(datas, "222222")
    let s = [];
    for (let i = 0; i < datas.column; i++) {
      s.push(
        <td>
          <textarea className='table-inpur' type="text" placeholder='contents'></textarea>
        </td>
      )
    }
    return s;
  }
  const createTable = useCallback(() => {
    console.log(datas, "1111")
    let tableArray = [];
    for (let i = 0; i < datas.row; i++) {
      tableArray.push(
        <tr key={i}>
          {rendercolumns()}
        </tr>
      )
    }
    return tableArray;
  }, [openTable]);

  const onClick = (event, value) => {
    if (value === "bold") {
      textarea.style.fontWeight === "bold" ? textarea.style.fontWeight = "normal" : textarea.style.fontWeight = "bold";
    }
    if (value === "table") {
      openRawColumn(true);
    }
  }


  return (
    <div>
      <EditorHeader />

      <div className='text-editor'>
        <Header onClick={(event, value) => onClick(event, value)} />
        <textarea id="textarea" className='text-element'>

        </textarea>
        {openTable &&
          <table>
            {createTable()}
          </table>
        }
      </div>

      <div className='button-submit'>
        <Button onClick={showDraft} label={isShow ? "Hide Editor" : "Show Editor"} />
      </div>

      {isShow && <div className='text-editor' dangerouslySetInnerHTML={{ __html: message }}></div>}

      {openraws && <div className="modal">
        <div className="modal-content">
          <span onClick={() => openRawColumn(false)} className="close">&times;</span>
          <input type="text" value={datas.row} placeholder="row" onChange={(e) => { setDatas({ ...datas, row: e.target.value }) }}></input>
          <input type="text" value={datas.column} placeholder="column" onChange={(e) => { setDatas({ ...datas, column: e.target.value }) }}></input>
          <button onClick={() => { setOpentable(true); openRawColumn(false); }}>Submit</button>
        </div>
      </div>}
    </div>
  )
}
