import React, { useState ,useEffect} from 'react'
import './style.css';

const ToDo = () => {
    const getLocalData=()=>{
        const lists=localStorage.getItem('myTodo');
        if(lists){
            return JSON.parse(lists);
        }
        else return [];
    }
    const [inputdata,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setisEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);
    const addItem=()=>{
        if(!inputdata){
            alert('Please Enter Something');
        }
        else if(toggleButton){
            setItems(
                items.map((ele)=>{
                if(ele.id==isEditItem){
                    return{...ele,name:inputdata}
                }
                return ele;
                })
            )
            setInputData('');
            setisEditItem(null);
            setToggleButton(false);
        }
        else {
            const mynewInputData={
                id:new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items,mynewInputData]);
            setInputData('');
        }
    }
const editItem=(index)=>{
    const item_todo_edited=items.find((ele)=>{
        return ele.id==index;
    })
    setInputData(item_todo_edited.name);
    setisEditItem(index);
    setToggleButton(true);

}

    const deleteItem=(index)=>{
const updatedItem=items.filter((ele)=>{
    return ele.id !=index;
})
setItems(updatedItem);
    }

    const removeAll=()=>{
        setItems([]);
    }


    // For Local Storage
    useEffect(()=>{
    localStorage.setItem("myTodo",JSON.stringify(items));
    },[items])
  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/toDo.png" alt="todologo"/>
                <figcaption>Add Your List Here :) </figcaption>

            </figure>
            <div className='addItems'>
            <input type="text" placeholder='📝 Add Items'  value={inputdata} onChange={((e)=>{
                setInputData(e.target.value);
            })}className='form-control'/>
            {toggleButton?(<i className="fa fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>
            <div className='showItems'>
                {items.map((ele)=>{
                return(
                    <div className='eachItem' key={ele.id}>
                    <h3>{ele.name}</h3>
                    <div className='todo-btn'>
            <i className="far fa-edit add-btn" onClick={()=>{
                editItem(ele.id)
            }}></i>
            <i className="far fa-trash-alt add-btn" onClick={()=>{
                deleteItem(ele.id);
            }}></i>


                    </div>
                </div>
                )
                })}
                
            </div>
            {/* /* Remove ALL button */ }
            <div className="showItems">
                <button className="btn effect04" onClick={removeAll} data-sm-link-text="Remove ALL" >
                    <span>CHECK LIST</span>
                </button>
                </div>
        </div>
    </div>
    </>
  )
}

export default ToDo
