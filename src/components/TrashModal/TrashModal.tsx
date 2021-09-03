import './style.css'
import { Modal } from '@material-ui/core';
import { deleteFolder, addDirect,addTrash, iFileandFolder, deleteTrash, openClose, addFromTrash } from "../../redux/folderslice";
import { useSelector, useDispatch } from 'react-redux';
import { iState } from '../../pages/AddInputs/AddInputs';
import { useHistory } from "react-router";




const TrashModal = () => {



    const dispatch = useDispatch();
    const modalOpen = useSelector((state:iState) => state.counter.modalOpen);
    const trash = useSelector((state:iState) => state.counter.trash)
    const history = useHistory();
    const goToFolder = (title:string,state:iFileandFolder) => {
        history.push(`/${title}`,state.type)
    }

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
        <Modal open={modalOpen}>
        <div className='modal_content'>
            <div className='modal_wrapper'>
            {trash.map((cur:iFileandFolder) => {
                return (
                    <div className='modal_item' key={cur.title} >
                        <img src={cur.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                        <p>{cur.title}</p>
                        <button onClick={() => dispatch(deleteTrash(cur.id))}>Remove</button>
                        <button onClick={() => trashAdd(cur)}>Recover</button>
                    </div>   
                )
            })}
            </div>
            <div>
                <button onClick={() => dispatch(openClose())}>X</button>
            </div>
        </div>
    </Modal>
    )
}

export default TrashModal;