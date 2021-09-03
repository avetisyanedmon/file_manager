import { useSelector } from "react-redux"
import { iState } from "../../pages/AddInputs/AddInputs"
import { iFileandFolder } from "../../redux/folderslice"



const Trash = () => {

    const dataTrash = useSelector((state:iState) => state.counter.trash)

    
    return(
        <div>
            {
                dataTrash.map((item:iFileandFolder) => {
                    return (
                        <div key={item.id}>
                            <img  src={item.type === 'folder' ? 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png': 'https://findicons.com/files/icons/2813/flat_jewels/128/file.png'} alt='icon'/>
                            <p>{item.title}</p>
                            <button >X</button>
                        </div>
                    )
                } )
            }
        </div>
    )
}

export default Trash;