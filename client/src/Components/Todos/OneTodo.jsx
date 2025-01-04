import axios from 'axios'
import { useState, useRef,useEffect } from 'react'
import React from 'react';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';





const OneTodo = (props) => {
  const titleRef = useRef(null)
  const tagsRef = useRef(null)
  const [visible, setVisible] = useState(false);
  const cities = [
    { name: 'בית', code: 'בית' },
    { name: 'לימודים', code: 'לימודים' },
    { name: 'עבודה', code: 'עבודה' },
    { name: 'בריאות', code: 'בריאות' },
  ];
  
  const [selectedCities, setSelectedCities] = useState([]);
  
  useEffect(() => {
    if (props.todo.tags && props.todo.tags.length > 0) {
      const formattedTags = props.todo.tags.map(tag => {
        const trimmedTag = tag.trim(); 
        return cities.find(city => city.name === trimmedTag) || { name: trimmedTag, code: trimmedTag };
      });
      setSelectedCities(formattedTags);
    }
  }, [props.todo.tags]);
  const deletetodo = async () => {

    try {
      const res = await axios.delete(`http://localhost:4300/api/todo/${props.todo._id}`)

      if (res.status === 200) {
        props.setTodoData(res.data)

      }
    } catch (e) {
      console.error(e)
    }

  }
    const update = async () => {
        
         const updatTodo={
          _id:props.todo._id,
          title:titleRef.current.value,
          tags:tagsRef.current.value.split(",")
         }
            
        try {
            const res = await axios.put('http://localhost:4300/api/todo',updatTodo)
            console.log(res.data);
            if (res.status === 200) {
                props.setTodoData(res.data)
            }
        } catch (e) {
          alert(e.response.data.message.toString())
        }
     
    }

  const updateComplete = async () => {

    try {
      const res = await axios.put(`http://localhost:4300/api/todo/${props.todo._id}`)

      if (res.status === 200) {
        props.setTodoData(res.data)

      }console.log(res.data);
    } catch (e) {
      console.error(e)
    }
    
  }
  
const footer = (
    <>
       <Button label="עדכן" icon="pi pi-pencil" onClick={() => setVisible(true)} rounded aria-label="Filter" severity='info' />
       <Button label="מחק" icon="pi pi-eraser" onClick={ deletetodo} style={{ marginLeft:"20px"}} severity='danger' rounded aria-label="Filter"/>
       <Button  icon="pi pi-check" onClick={ updateComplete} style={{backgroundColor:props.todo.completed?"green":"gray", marginLeft:"30px",borderColor:props.todo.completed?"green":"gray"}} rounded aria-label="Filter" />

    </>
);

  return (
        
       <>
         <Dialog style={{direction:"rtl"}}
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                כותרת
                            </label>
                            <InputText id="username" defaultValue={props.todo.title}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            תגיות
                            </label>
                            {/* <InputText id="username" defaultValue={props.todo.tags} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={tagsRef} ></InputText> */}
                            <MultiSelect value={selectedCities} onChange={(e) =>{setSelectedCities(e.value);return}} options={cities} optionLabel="name" 
                placeholder="Select tags" inputRef={tagsRef} className="bg-white-alpha-20 border-none p-3 text-primary-50"  />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="עדכן" onClick={(e) => {update();hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => {  hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        <div className="card flex justify-content-center">
            <Card title={props.todo.title}  footer={footer}  className="md:w-25rem">
            
            {  props.todo.tags.map(t=><h3>{t}</h3>)}
            </Card>
        </div>
     {/* <h1>{props.todo.title}</h1>
     {props.todo.tags.map(t=><h2>{t}</h2>)} */}
       
     </>  
    )
}



export default OneTodo









