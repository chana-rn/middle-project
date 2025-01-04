import axios from 'axios'
import { useState, useRef } from 'react'
import React from 'react';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';





const OneUser = (props) => {
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const addressRef = useRef(null)
    const phoneRef = useRef(null)
    const [visible, setVisible] = useState(false);

    const deleteUser = async () => {

        try {
            const res = await axios.delete(`http://localhost:4300/api/user/${props.user._id}`)

            if (res.status === 200) {
                props.setUserData(res.data)

            }
        } catch (e) {
            console.error(e)
        }

    }


    const update = async () => {
        
        const newuser={
            _id:props.user._id,
            name:nameRef.current.value,
            username:usernameRef.current.value,
            email:emailRef.current.value,
            address:addressRef.current.value,
            phone:phoneRef.current.value
         }
           
       try {
           const res = await axios.put('http://localhost:4300/api/user',newuser)
           console.log(res.data);
           if (res.status === 200) {
               props.setUserData(res.data)
           }
       } catch (e) {
        alert(e.response.data.message.toString())
       }
    
   }


    const footer = (
        <>
            <Button label="עדכן" icon="pi pi-pencil" onClick={() => setVisible(true)} rounded aria-label="Filter" severity='info' />
            <Button label="מחק" icon="pi pi-eraser" onClick={deleteUser} style={{ marginLeft: "20px" }} severity='danger' rounded aria-label="Filter" />

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
                                שם
                            </label>
                            <InputText id="username" defaultValue={props.user.name} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={nameRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם משתמש
                            </label>
                            <InputText id="username" defaultValue={props.user.username}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={usernameRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                אמייל
                            </label>
                            <InputText id="username" defaultValue={props.user.email}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={emailRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                כתובת
                            </label>
                            <InputText id="username" defaultValue={props.user.address} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={addressRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                טלפון
                            </label>
                            <InputText id="username" defaultValue={props.user.phone}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={phoneRef}></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="עדכן" onClick={(e) => { update(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
            <div className="card flex justify-content-center">
                <Card title={props.user.username} footer={footer} className="md:w-25rem">

                </Card>
            </div>
            {/* <h1>{props.user.name}</h1>
     {props.user.username.map(t=><h2>{t}</h2>)} */}

        </>
    )
}


export default OneUser
