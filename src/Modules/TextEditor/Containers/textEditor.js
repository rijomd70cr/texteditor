import React, { useState } from 'react';

import Button from '../../../Components/Button/index';
import EditorHeader from '../Components/editorHeader';
// import Header from './header';

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, Modifier, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from 'prop-types';

import '../Style/editor.css';
import { BsTable } from 'react-icons/bs';

function CustomOption(props) {
  const [openraws, openRawColumn] = useState(false);
  const [datas, setDatas] = useState({
    row: '',
    column: ''
  });

  const addTable = () => {
    const { editorState, onChange } = props;
    let contentState;
    let html = `<table style='border:1px solid #ccc'>
        <tr>
          <td><strong>A1</strong></td>
          <td><em>B1</em></td>
        </tr>
        <tr>
          <td style="color:red;">A2</td>
          <td>B2</td>
        </tr>
      </table>`;

    const blocksFromHTML = convertFromHTML(html);
    const { contentBlocks, entityMap } = blocksFromHTML;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      contentState.getBlockMap()
      );
      console.log("lll", contentState);

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  return (
    <div className="rdw-option-wrapper"
      aria-selected="false"
      role="button"
      title="Table" >
      <BsTable onClick={() => openRawColumn(true)} />
      {openraws && <div>
        <input type="text" value={datas.row} placeholder="row" onChange={(e) => { setDatas({ ...datas, row: e.target.value }) }}></input>
        <input type="text" value={datas.column} placeholder="column" onChange={(e) => { setDatas({ ...datas, column: e.target.value }) }}></input>
        <button onClick={addTable} type='button'>OK</button>
      </div>}
    </div>
  );
}

export default function TextEditor() {

  const [editorState, setEditorstate] = useState(EditorState.createEmpty());
  const [message, setMessage] = useState();
  const [isShow, setShow] = useState(false);

  function onEditorStateChange(editorState) {
    setEditorstate(editorState);
    setMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const onClick = () => {
    setShow(!isShow);
  }

  return (
    <div>
      <EditorHeader />
      <div className='text-editor'>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          toolbarCustomButtons={[<CustomOption />]}
        // toolbar={{ colorPicker: { component: ColorPic } }}
        />
      </div>
      <div className='button-submit'>
        <Button onClick={onClick} label={isShow ? "Hide Editor" : "Show Editor"} />
      </div>
      {isShow && <div className='text-editor' dangerouslySetInnerHTML={{ __html: message }}></div>}
    </div>
  )
}
