import axios from 'axios'
import { useState, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
const AddTodo = (props) => {

    const titleRef = useRef(null)
    const tagsRef = useRef(null)
    const [selectedTagsOptions, setSelectedTagsOptions] = useState(null);
    const tagsOptions = [
        { name: 'בית', code: 'NY' },
        { name: 'לימודים', code: 'RM' },
        { name: 'עבודה', code: 'LDN' },
        { name: 'בריאות', code: 'IST' },
    ];
    const createTodo = async () => {
        const newtodo = {
            title: titleRef.current.value,
            tags: tagsRef.current.value.split(",")
        }
        try {
            const res = await axios.post('http://localhost:4300/api/todo', newtodo)
            console.log(res.data);
            if (res.status === 200) {
                props.setTodoData(res.data)
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
                            <InputText id="username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                תגיות
                            </label>
                            <MultiSelect value={selectedTagsOptions} onChange={(e) => { setSelectedTagsOptions(e.value); return }} inputRef={tagsRef} options={tagsOptions} optionLabel="name"
                                maxSelectedLabels={5} className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                style={{
                                    border: '1px solid var(--primary-color)',
                                    backgroundColor: 'var(--primary-color)',
                                    color: '#ffffff'
                                }}
                            />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => { createTodo(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}
export default AddTodo