import React, {useEffect, useState} from 'react';
import './Main.css'
import {useNavigate} from "react-router-dom";
import '../../style.css'

function Main() {
    const navigate = useNavigate()
    const userSessionStorage = JSON.parse(sessionStorage.getItem('user'))
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    const [user, setUser] = useState({})
    const [lightTheme, setLightTheme] = useState(false)



    function checkInfo() {
        if (userSessionStorage === null && userLocalStorage === null) {
            goLoginPage()
        } else if(userLocalStorage !== null) {
            setUser(userLocalStorage)
        } else if (userSessionStorage !== null) {
            setUser(userSessionStorage)
        }
    }

    function goLoginPage() {
        navigate('/login')
    }

    useEffect(() => {
        // if (userLocalStorage) {
        //     setUser(userLocalStorage)
        // } else if (userSessionStorage) {
        //     setUser(userSessionStorage)
        // }
        checkInfo()
    }, [])

    return (
        <div className={`Page ${lightTheme ? 'PageLight' : null}`}>
            {user === {} ? null
            :
                <div className={'ff'}>
                    <div className={`profile ${lightTheme ? 'profileDark' : null}`}>
                        <div className={`title ${lightTheme ? 'titleLight' : null}`}>
                            <p>Полное имя:</p>
                            <p>Логин:</p>
                            <p>Пол:</p>
                            <p>Город:</p>
                            <p>Работа:</p>
                            <p>Язык:</p>
                        </div>
                        <div className={`info ${lightTheme ? 'titleLight' : null}`}>
                            <p>{user.fullName}</p>
                            <p>{user.username}</p>
                            <p>{user.sex}</p>
                            <p>{user.city}</p>
                            <p>{user.job}</p>
                            <p>{user.language}</p>
                        </div>
                    </div>
                </div>

            }
            <div
                onClick={() => {
                    setLightTheme(!lightTheme)
                    console.log(!lightTheme)
                }}
                className={'theme'}
            />
        </div>
    );
}

export default Main;