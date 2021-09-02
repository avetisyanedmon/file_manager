import './style.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolder, addFile, deleteFolder, FileandFolder } from "../../redux/folderslice";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";


const AddInputs = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const data = useSelector((state:any ) => state.counter.value)
    console.log(data)
    const history = useHistory();
    const currentFiles = data.filter((f:FileandFolder) => f.parent === '0');
    const foldinclud = currentFiles.filter((cur:FileandFolder) => cur.title === title && cur.type === "folder");
    const fileinclud = currentFiles.filter((cur:FileandFolder) => cur.title === title && cur.type === "file")
    const folderClick = foldinclud.length === 0 && title.length > 0 ? () => {dispatch(addFolder(inner))}: undefined;
    const fileClick = fileinclud.length === 0 && title.length > 0 ? () => {dispatch(addFile(inner))}: undefined;
    const goToFolder = (title:string,state:FileandFolder) => {
        history.push(`/${title}`,state.type)
    }
    const inner = {
        text:title,
        parent:'0'
    }
    

    return (
        <div className='container'>
            <div className='inputs_box'>
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <button onClick={folderClick}>Add Folder</button>
                    <button onClick={fileClick}>Add File</button>
                </div>
            </div>
            <div className='content'>
                {currentFiles.map((cur:FileandFolder) => {
                    return (
                        <div className='content_box' key={cur.id} >
                            <img onClick={() => goToFolder(cur.title,cur)} src={cur.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                            <p>{cur.title}</p>
                            <button onClick={() => {dispatch(deleteFolder(cur.id))}}>X</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AddInputs;