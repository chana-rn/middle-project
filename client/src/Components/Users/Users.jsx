import axios from 'axios'
import { useState, useRef } from 'react'
import OneUser from './OneUser'
import { useEffect } from 'react'
import AddUser from './AddUser'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Users = () => {
    const [userData, setUserData] = useState([])
    const [visible, setVisible] = useState(false);
    const userNameRef = useRef(null)

    const getUsers = async () => {

        try {
            const res = await axios.get('http://localhost:4300/api/user')
            if (res.status === 200) {
                console.log(userData)
                setUserData(res.data)
            }
        } catch (e) {
            console.error(e)
        }


    }
    useEffect(() => {
        getUsers()
    }, [])



    const getbyUsername = async () => {
        try {

            const res = await axios.get(`http://localhost:4300/api/user/byUname/${userNameRef.current.value}`)
            if (res.status === 200) {
                console.log(res.data)
                setUserData(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }




    return (
        <>
            <h1 style={{ margin: "0" }} className="card flex justify-content-center">משתמשים</h1>
            <div style={{ margin: "0" }} className="card flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1" style={{ marginLeft: "40%", marginRight: "40%" }} >
                    <InputText placeholder=" הכנס שם משתמש" style={{ direction: "rtl" }} ref={userNameRef} onChange={() => { userNameRef.current.value ? getbyUsername() : getUsers() }} />
                    <Button icon="pi pi-search" severity='info' />

                </div>
            </div>
            <Button icon="pi pi-plus" rounded aria-label="Filter" style={{ position: "fixed", right: 0, bottom: 0, marginRight: "50px", marginBottom: "50px" }} severity='info' onClick={() => setVisible(true)} />

            {
                visible && <AddUser setUserData={setUserData} setVisible={setVisible} visible={visible} />

            }
            {

                userData.sort((a, b) => a._id < b._id).map(user =>
                    <OneUser user={user} setUserData={setUserData} />
                )
            }


        </>
    )
}
export default Users
