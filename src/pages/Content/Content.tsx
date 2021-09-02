import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFile, addFolder, deleteFolder, FileandFolder} from "../../redux/folderslice";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";

type idType = {
    id:string
}



const Content = () => {
    
    const {id} = useParams<idType>()
    const data = useSelector((state:any) => state.counter.value)
    const dispatch = useDispatch();
    console.log(data)
    const [title, setTitle] = useState('');
    const foldinclud = data.filter((cur:FileandFolder) => cur.title === title && cur.type === "folder");
    const fileinclud = data.filter((cur:FileandFolder) => cur.title === title && cur.type === "file")
    const folderClick = foldinclud.length === 0 && title.length > 0 ? () => {dispatch(addFolder(parent))}: undefined;
    const fileClick = fileinclud.length === 0 && title.length > 0 ? () => {dispatch(addFile(parent))}: undefined;
    const parent = {
        text:title,
        parent:id
    }
    const currentFiles = data.filter((f:FileandFolder) => f.parent === id)
    const history = useHistory()
    const goToFolder = (title:string,state:string) => {
        history.push(`/${title}`,state)};
    const location = useLocation()
    const typeOfFile = location.state


    return (
        <>
        {typeOfFile === 'folder' ? 
        <div className='container'>
            <div className='inputs_box'>
                <input onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={folderClick}>Add Folder</button>
                <button onClick={fileClick}>Add File</button>
            </div>
            <div className='content'>
            {currentFiles.map((cur:FileandFolder) => {
                    return (
                        <div className='content_box' >
                            <img onClick={() => goToFolder(cur.title,cur.type)} src={cur.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                            <p>{cur.title}</p>
                            <button onClick={() => {dispatch(deleteFolder(cur.id))}}>X</button>
                        </div>
                    )
                })}
            </div>
        </div> : 
        <div className='filescontent'>
                <textarea>
                    
                </textarea>
        </div>}
        </>
    )
}

export default Content;