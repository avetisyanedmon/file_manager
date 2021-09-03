import './style.css'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFolder, addFile, deleteFolder, addDirect, deleteDirect,addTrash, iFileandFolder, deleteTrash, openClose, addFromTrash } from "../../redux/folderslice";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
import trashVector from '../../components/Trash/trash.png';
import { Modal } from '@material-ui/core';
import TrashModal from '../../components/TrashModal/TrashModal';


export interface iState {
    counter:{
        value:iFileandFolder[]
        breadCrumb: string[]
        trash:iFileandFolder[]
        modalOpen:boolean
    }
}

const AddInputs = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const data = useSelector((state:iState ) => state.counter.value);
    const trash = useSelector((state:iState) => state.counter.trash);
    const modalOpen = useSelector((state:iState) => state.counter.modalOpen)
    const history = useHistory();
    const currentFiles = data.filter((f:iFileandFolder) => f.parent === '0');
    const foldinclud = currentFiles.filter((cur:iFileandFolder) => cur.title === title && cur.type === "folder");
    const fileinclud = currentFiles.filter((cur:iFileandFolder) => cur.title === title && cur.type === "file")
    const folderClick = foldinclud.length === 0 && title.length > 0 ? () => {dispatch(addFolder(inner))}: undefined;
    const fileClick = fileinclud.length === 0 && title.length > 0 ? () => {dispatch(addFile(inner))}: undefined;
    const goToFolder = (title:string,state:iFileandFolder) => {
        history.push(`/${title}`,state.type)
    }
    const inner = {
        text:title,
        parent:'0'
    }


    useEffect(() => {
        dispatch(deleteDirect(''))
    },[])


    const imageClick = (cur:iFileandFolder) => {
        dispatch(addDirect(cur.title))
        goToFolder(cur.title,cur)
    }
    const deleteClick = (cur:iFileandFolder) => {
        dispatch(deleteFolder(cur))
        dispatch(addTrash(cur))
    }
    const trashAdd = (cur:iFileandFolder) => {
        dispatch(addFromTrash(cur))
        dispatch(deleteTrash(cur.id))
    }

    return (
        <div className='container'>
            <div className='inputs_wrapper'>
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <button onClick={folderClick}>Add Folder</button>
                    <button onClick={fileClick}>Add File</button>
                </div>
            </div>
            <TrashModal/>
            <div className='content'>
                {currentFiles.map((cur:iFileandFolder) => {
                    return (
                        <div className='content_box' key={cur.id} >
                            <img onClick={() => imageClick(cur)} src={cur.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                            <p>{cur.title}</p>
                            <button onClick={() => deleteClick(cur)}>X</button>
                        </div>   
                    )
                })}
                <div className='trash' onClick={() => dispatch(openClose())}>
                    <p>{trash.length}</p>
                    <img src={trashVector}/>
                </div> 
            </div>
        </div>
    )
}

export default AddInputs;