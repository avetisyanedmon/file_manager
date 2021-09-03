import { useSelector } from "react-redux";
import './style.css'
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { iState } from "../../pages/AddInputs/AddInputs";




const BreadCrumb = () => {


    const data = useSelector((state: iState) => state.counter.breadCrumb)
    const history = useHistory();
    const location = useLocation();
    const type = location.state;


    return (
        <div className='bread_wrapper'>
           {
               data.map((dir:string) => {
                   return(
                    <div className='bread_item' key={dir}>
                        <p onClick={() => history.push(dir, type)}>{dir}</p>
                        <p className='item_slash'>/</p>
                        </div>
                        
                    )
               })
           }
        </div>
    )
}

export default BreadCrumb;