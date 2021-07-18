import {useState, useReducer, useEffect} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';
import Alert from './alert';
const getLocalStorage = () => {
  let item = localStorage.getItem('item');
  if (item) {
    return (item = JSON.parse(localStorage.getItem('item')));
  } else {
    return [];
  }
};
function App() {
  const [edit, isEdit] =useState(false)
  const [userId , setUserId] =useState(null);
  const [name, setName] =useState('');
  
 
  const initialState={
    item:getLocalStorage(),
    alert:false,
    status:false,
    statusCode:'success',
    status:"danger",
    msg:'initial msg'
    
  }
  const reduce= (state, action) => {
    if(action.type ==='ADD'){
      const newData=[...state.item ,action.payload]
      return {
        ...state,
        item:newData,
        alert:true,
        status:true,
        statusCode:'success',
        msg:'item added to list'
        
      }
    }
    if(action.type === 'CLEAR'){
      return {
        ...state,
        item:[],
        alert:true,
        status:true,
        msg:'Whole Item Cleared',
        statusCode:'danger'
      }
    }
    if(action.type === 'EMPTY'){
      return {
        ...state,
        alert:true,
        status:true,
        msg:'please Aleast add One item',
        statusCode:'danger'
      }
    }
    if(action.type === 'TIMEOUT'){
      return {
        ...state,
        alert:false,
        status:false

      }
      
    }
    if(action.type ==='REMOVE'){
      let filterItems = state.item.filter((items)=> items.id !== action.payload)
      return {
        ...state,
        item:filterItems,
        alert:true,
        status:true,
        statusCode:'danger',
        msg:"item Removed"

      }
    }
    if(action.type=== 'EDIT'){
      const newList = state.item.map((list)=>{
        if(list.id === userId){
          return { ...list,title: name };

        }
        return list;
      })
      setName('')
      setUserId(null);
      isEdit(false)

      return {
        ...state,
        item:newList,
        alert:true,
        status:true,
        msg:'item Edited',
        statusCode:'success'

      }
    }
    return state;

  }
  const [state, dispatch] =useReducer(reduce, initialState);
  //submit
  const handleSubmit =(e) => {
    e.preventDefault();
    if(!name){
      dispatch({type:'EMPTY'})
    }
    else if(name &&edit){
      dispatch({type:'EDIT'})

    }else{
      const data ={id:new Date().getTime().toString(), title:name}
      dispatch({type:'ADD' ,payload:data})
      setName('')
    }

  }
  //clear
  const clearItems = () => {
    dispatch({type:'CLEAR'})
  }
const timeOutNotification = () => {
    dispatch({type:'TIMEOUT'})
  }

const editItem = (id) => {
    const specificItem = state.item.find((items) => items.id === id);
    isEdit(true);
    setUserId(id);
    setName(specificItem.title);
  };
  useEffect(()=>{
    localStorage.setItem('item', JSON.stringify(state.item));
  }, [state.item])

return(
  <section className='section-center'>
  <form className='grocery-form' onSubmit = {handleSubmit} >
  <h3> Grocery item </h3>
  {
    state.alert && state.status ?  <Alert alertMsg ={state.statusCode}msg ={state.msg} timeOutNotification ={timeOutNotification} alerts = {state.alert} />:''
  }
    <div className='form-control'>

    <input className='grocery' type ='text' placeholder ='eg. eggs' value = {name} onChange={(e)=>setName(e.target.value)} />
    <button type ="btn" className='submit-btn'>{edit?"edit":"add"}</button>
    </div>
  </form>
    <div className='grocery-container '>
    <div className='grocery-list'>
     {
      state.item.map((lists, index)=>{
        const {id, title} = lists;
        return <article key ={id} className='grocery-item' >
        <p className='title'>{index+1} {title} </p>
        <div className='btn-container'>
        <button className='edit-btn' onClick = {()=>editItem(id)} > 
          <FaEdit/> 
        </button>
        <button className='delete-btn' onClick =  {() =>dispatch({type:'REMOVE', payload:id})} >
          <FaTrash/> </button>
          <input type ="checkbox" name = "checkbox"  />
        </div>
        
        </article>
      })

     }
     </div>
    </div>
    <button 
      className='clear-btn'
      onClick ={clearItems} >
      Clear All 
    </button>
  </section>
  );
}
export default App;
