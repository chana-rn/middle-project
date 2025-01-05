import axios from 'axios'
import { useState, useRef } from 'react'
import OneTodo from './OneTodo'
import { useEffect } from 'react'
import AddTodo from './AddTodo'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Todos = () => {
    const [todoData, setTodoData] = useState([])
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(true);

    const titleRef = useRef(null)

    const getTodos = async () => {
        
        try {
            const res = await axios.get('http://localhost:4300/api/todo')
            if (res.status === 200) {
                console.log(todoData)
                
                setTodoData(res.data)
                setFlag(true)
            }
        } catch (e) {
            console.error(e)
        }


    }
    useEffect(() => {
        getTodos()
    }, [])

 

    const getbyTitle = async (titleRef) => {
        try {

            const res = await axios.get(`http://localhost:4300/api/todo/byTitle/${titleRef.current.value}`)
            if (res.status === 200) {
                console.log(res.data)
                setTodoData(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const getuncompleted = async () => {
        try {

            const res = await axios.get(`http://localhost:4300/api/todo/uncomplete`)
            if (res.status === 200) {
                console.log(res.data)
                setTodoData(res.data)
                setFlag(false)
            }
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
        <h1 style={ {margin:"0"}}  className="card flex justify-content-center">משימות</h1>
            <div  style={ {margin:"0"}} className="card flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1" style={{ marginLeft: "40%", marginRight: "20%" }} >
                <div className="p-inputgroup flex-1" style={{ marginRight: '20%' }}>
                    <InputText icon="pi pi-search" placeholder="שם משימה"  style={{ direction: "rtl" }} ref={titleRef}  onChange={()=>{titleRef.current.value? getbyTitle(titleRef):getTodos()}} />
                    <Button icon="pi pi-search"  severity='info'/>
                 </div>   
                </div>
                {flag?
                <Button icon="pi pi-search" rounded aria-label="Filter" label="משימות שלא השלמו" severity='info' onClick={
                       getuncompleted } />:
                     <Button  rounded aria-label="Filter" label="לכל המשימות" severity='info' onClick={()=>{getTodos()}}></Button>  }
            </div>
            <Button icon="pi pi-plus" rounded aria-label="Filter" style={{ position:"fixed", right:0 ,bottom:0, marginRight:"50px", marginBottom:"50px"}} severity='info' onClick={() => setVisible(true)} />

            {
                visible && <AddTodo setTodoData={setTodoData} setVisible={setVisible} visible={visible} />

            }
            {
   
                todoData.sort((a, b) => a._id < b._id).map(todo =>{
                    return<OneTodo todo={todo} setTodoData={setTodoData} />}
                )
            }


        </>
    )
}
export default Todos




