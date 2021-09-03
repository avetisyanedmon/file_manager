import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFile, addFolder, deleteFolder, addDirect, iFileandFolder, deleteDirect, addTrash,deleteTrash, openClose,addFromTrash} from "../../redux/folderslice";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { iState} from '../AddInputs/AddInputs'
import { useEffect } from 'react';
import trashVector from '../../components/Trash/trash.png';
import { Modal } from '@material-ui/core';
import TrashModal from '../../components/TrashModal/TrashModal';


export type idType = {
    id:string
}



const Content = () => {
    
    const {id} = useParams<idType>()
    const data = useSelector((state:iState) => state.counter.value)
    const trash = useSelector((state:iState) => state.counter.trash)
    const modalOpen = useSelector((state:iState) => state.counter.modalOpen)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const foldinclud = data.filter((cur:iFileandFolder) => cur.title === title && cur.type === "folder");
    const fileinclud = data.filter((cur:iFileandFolder) => cur.title === title && cur.type === "file")
    const folderClick = foldinclud.length === 0 && title.length > 0 ? () => {dispatch(addFolder(parent))}: undefined;
    const fileClick = fileinclud.length === 0 && title.length > 0 ? () => {dispatch(addFile(parent))}: undefined;
    const currentFiles = data.filter((f:iFileandFolder) => f.parent === id)
    const history = useHistory()
    const goToFolder = (title:string,state:string) => {
        history.push(`/${title}`,state)};
    const location = useLocation()
    const typeOfFile = location.state
    const parent = {
        text:title,
        parent:id
    }
    const imageClick = (cur:iFileandFolder) => {
        dispatch(addDirect(cur.title))
        goToFolder(cur.title,cur.type)
    }
    const deleteClick = (cur:iFileandFolder) => {
        dispatch(deleteFolder(cur))
        dispatch(addTrash(cur))
    }

    useEffect(() => {
        dispatch(deleteDirect(id))
    },[id])


    return (
        <>
        {typeOfFile === 'folder' ? 
        <div className='container'>
            <div className='inputs_wrapper'>
                <input onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={folderClick}>Add Folder</button>
                <button onClick={fileClick}>Add File</button>
            </div>
            <div className='content'>
            <TrashModal/>
            {currentFiles.map((cur:iFileandFolder) => {
                    return (
                        <div key={cur.id}>
                        <div className='content_box'  >
                            <img onClick={() => imageClick(cur)} src={cur.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                            <p>{cur.title}</p>
                            <button onClick={() => deleteClick(cur)}>X</button>
                        </div>
                        </div>
                    )
                })}
            </div>
            <div className='trash' onClick={() => dispatch(openClose())}>
                <p>{trash.length}</p>
                <img src={trashVector}/>
            </div>
        </div> : typeOfFile === 'file' ?
        <div className='filescontent'>
                <textarea>
                    
                </textarea>
        </div> : <h1>Page does not exist!!!!</h1>}
        </>
    )
}

export default Content;