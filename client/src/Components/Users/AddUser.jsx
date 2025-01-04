import axios from 'axios'
import { useState, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
const AddUser = (props) => {
  
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const addressRef = useRef(null)
    const phoneRef = useRef(null)
   

    
    const createUser = async () => {
         const newuser={
             name:nameRef.current.value,
             username:usernameRef.current.value,
             email:emailRef.current.value,
             address:addressRef.current.value,
             phone:phoneRef.current.value
          }
        try {
            const res = await axios.post('http://localhost:4300/api/user',newuser)
            console.log(res.data);
            if (res.status === 200) {
                props.setUserData(res.data)
            }
        } catch (e) {
           alert(e.response.data.message.toString())
        }
     
    }

    return (
        <>
              <Dialog style={{direction:"rtl"}}
                visible={props.visible}
                modal
                onHide={() => {if (!props.visible) return; props.setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם
                            </label>
                            <InputText id="username"   className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={nameRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            שם משתמש
                            </label>
                            <InputText id="username"   className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={usernameRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            אמייל
                            </label>
                            <InputText id="username"   className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={emailRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            כתובת 
                            </label>
                            <InputText id="username"   className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={addressRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            טלפון
                            </label>
                            <InputText id="username"   className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={phoneRef}></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => {createUser();hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => {  hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}
export default AddUser