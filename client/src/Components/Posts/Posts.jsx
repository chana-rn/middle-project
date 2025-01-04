import axios from 'axios'
import { useState, useRef } from 'react'
import OnePost from './OnePost'
import { useEffect } from 'react'
import AddPost from './AddPost'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Posts = () => {
    const [postData, setPostData] = useState([])
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(true);

    const titleRef = useRef(null)

    const getPosts = async () => {

        try {
            const res = await axios.get('http://localhost:4300/api/post')
            if (res.status === 200) {
                console.log(postData)

                setPostData(res.data)
                setFlag(true)
            }
        } catch (e) {
            console.error(e)
        }


    }
    useEffect(() => {
        getPosts()
    }, [])

    // useEffect(() => {
    //     getbyTitle(titleRef)
    // }, [titleRef])

    const getbyTitle = async (titleRef) => {
        try {

            const res = await axios.get(`http://localhost:4300/api/post/byTitle/${titleRef.current.value}`)
            if (res.status === 200) {
                console.log(res.data)
                setPostData(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }




    return (
        <><h1>מאמרים</h1>
            <div className="card flex flex-column md:flex-row gap-3">

                {/* <div className="p-inputgroup flex-1" style={{ marginLeft: "40%", marginRight: "30%" }} > */}
                    <IconField style={{ marginLeft: "40%", marginRight: "30%" }}>
                        <InputIcon className="pi pi-search" ></InputIcon>
                        <InputText  placeholder="הכנס שם מאמר" style={{ direction: "rtl" }} ref={titleRef} onChange={() => { titleRef.current.value ? getbyTitle(titleRef) : getPosts() }} />
                    </IconField>

                {/* //</div> */}
 

            </div>
            <Button icon="pi pi-plus" rounded aria-label="Filter" style={{ position: "fixed", right: 0, bottom: 0, marginRight: "50px", marginBottom: "50px" }} severity='info' onClick={() => setVisible(true)} />

            {
                visible && <AddPost setPostData={setPostData} setVisible={setVisible} visible={visible} />

            }
            {

                postData.sort((a, b) => a._id < b._id).map(post => {
                    return <OnePost post={post} setPostData={setPostData} />
                }
                )
            }


        </>
    )
}
export default Posts




