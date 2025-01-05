import axios from 'axios'
import {  useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

import { InputText } from 'primereact/inputtext';
const AddPost = (props) => {

    const titleRef = useRef(null)
    const bodyRef = useRef(null)
   
    const createPost = async () => {
        const newpost = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        try {
            const res = await axios.post('http://localhost:4300/api/post', newpost)
            console.log(res.data);
            if (res.status === 200) {
                props.setPostData(res.data)
            }
        } catch (e) {
            alert(e.response.data.message.toString())
        }

    }

    return (
        <>
            <Dialog style={{ direction: "rtl" }}
                visible={props.visible}
                modal
                onHide={() => { if (!props.visible) return; props.setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                כותרת
                            </label>
                            <InputText id="username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef} required></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <FloatLabel className="bg-white-alpha-20 border-none p-3 text-primary-50">
                                <InputTextarea className="bg-white-alpha-20 border-none p-3 text-primary-50" id="description"  rows={5} cols={30} ref={bodyRef} />
                                <label htmlFor="description">גוף המאמר</label>
                            </FloatLabel>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => { createPost(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}
export default AddPost


