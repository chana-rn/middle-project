import axios from 'axios'
import { useState, useRef } from 'react'
import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from 'primereact/fieldset';




const OnePost = (props) => {
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const [visible, setVisible] = useState(false);
  
  const deletepost = async () => {

    try {
      const res = await axios.delete(`http://localhost:4300/api/post/${props.post._id}`)

      if (res.status === 200) {
        props.setPostData(res.data)

      }
    } catch (e) {
      console.error(e)
    }

  }
  const update = async () => {

    const updatPost = {
      _id: props.post._id,
      title: titleRef.current.value,
      body: bodyRef.current.value
    }

    try {
      const res = await axios.put('http://localhost:4300/api/post', updatPost)
      console.log(res.data);
      if (res.status === 200) {
        props.setPostData(res.data)
      }
    } catch (e) {
      alert(e.response.data.message.toString())
    }

  }



  const footer = (
    <>
      <Button label="עדכן" icon="pi pi-pencil" onClick={() => setVisible(true)} rounded aria-label="Filter" severity='info' />
      <Button label="מחק" icon="pi pi-eraser" onClick={deletepost} style={{ marginLeft: "20px" }} severity='danger' rounded aria-label="Filter" />

    </>
  );

  return (

    <>
      <Dialog style={{ direction: "rtl" }}
        visible={visible}
        modal
        onHide={() => { if (!visible) return; setVisible(false); }}
        content={({ hide }) => (
          <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

            <div className="inline-flex flex-column gap-2">
              <label htmlFor="username" className="text-primary-50 font-semibold">
                כותרת
              </label>
              <InputText id="username" defaultValue={props.post.title} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef} ></InputText>
            </div>
            <div className="inline-flex flex-column gap-2">
              <FloatLabel className="bg-white-alpha-20 border-none p-3 text-primary-50">
                <InputTextarea style={{backgroundcolor:"white"}} className="bg-white-alpha-20 border-none p-3 text-primary-50" id="description" rows={5} cols={30} ref={bodyRef} defaultValue={props.post.body}/>
                <label htmlFor="description">גוף המאמר</label>
              </FloatLabel>
            </div>
            <div className="flex align-items-center gap-2">
              <Button label="עדכן" onClick={(e) => { update(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
              <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            </div>
          </div>
        )}
      ></Dialog>
      <div className="card flex justify-content-center">
        <Card title={props.post.title} footer={footer} className="md:w-25rem">

        <Fieldset legend="גוף המאמר" toggleable>
                <p className="m-0" style={{width:"20px"}}>
                    {props.post.body}
                </p>
            </Fieldset>
        </Card>
      </div>
   

    </>
  )
}



export default OnePost










