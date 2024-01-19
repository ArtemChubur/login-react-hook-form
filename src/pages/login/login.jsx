import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import './Login.css'
import '../../style.css'
import {axiosInstance} from "../../API";
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [lightTheme, setLightTheme] = useState(false)
    const [error, serError] = useState(false)
    const [remember, setRemember ] = useState(false)
    const [alertInfo, setAlertInfo] = useState({
        severity: '',
        message: ''
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/login/', data)
            if (response.status === 200) {
                reset()
                setRemember(false)
                const userData = response.data.user
                let userStr = JSON.stringify(userData)
                if (remember === true) {
                    localStorage.setItem('user', userStr)
                    goMainPage()
                } else if (remember === false) {
                    sessionStorage.setItem('user', userStr)
                    goMainPage()
                }
            }
        } catch (e) {
            if (e.response.status === 401) {
                setAlertInfo({
                    severity: 'error',
                    message: 'Не верный логин или пароль.'
                })
                serError(true)
                setTimeout(() => {serError(false)}, 2000)

            } else if (e.response.status === 404) {
                setAlertInfo({
                    severity: 'warning',
                    message: 'Сервер не отвечает.'
                })
                serError(true)
                setTimeout(() => {serError(false)}, 2000)
            }
        }
    }

    function goMainPage() {
        navigate('/')
    }

    useEffect(() => {
        let themeHistory = localStorage.getItem('theme')
        if (themeHistory === 'true') {
            setLightTheme(true)
        } else if (themeHistory === 'false') {
            setLightTheme(false)
        }

        if (localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', `${lightTheme}`)
        }
    }, [])

    return (
        <div className={`Page LoginPage ${lightTheme ? 'PageLight' : null}`}>
            <Alert className={`alert ${error && 'alertTrue'}`} severity={alertInfo.severity}>{alertInfo.message}</Alert>
            <h1 className={`textDark ${lightTheme && 'textLight'}`}>Sign in</h1>
            <p className={`textDark ${lightTheme && 'textLight'}`}>Sign in and start managing your candidates!</p>
            <form align={'center'} onSubmit={handleSubmit(onSubmit)}>
                {errors?.username &&
                    (<div className={'error'}>{errors.username.message}</div>)
                }
                <input
                    {...register('username', {
                        required: 'Имя не может быть пустым',
                        minLength: {
                            value: 4,
                            message: 'Минимум 4 символа'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Максимум 16 символов'
                        },
                    })}
                    type="text"
                    placeholder={'Login'}
                    className={`input ${lightTheme && 'inputLight'}`}
                />
                {errors?.password &&
                    (<div className={'error'}>{errors.password.message}</div>)
                }
                <input
                    {...register('password', {
                        required: 'Пароль не может быть пустым',
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    type="password"
                    placeholder={'Password'}
                    className={`input ${lightTheme ? 'inputLight' : null}`}
                />
                <div className={'forgotPass'}>
            <span>
            <input
                className={'checkbox'}
                type="checkbox"
                onClick={() => {setRemember(!remember)}}
            />
            <span className={`textDark ${lightTheme ? 'textLight' : null}`}>Remember me</span></span>
            <span>
                <a href="/">Forgot password?</a>
            </span>
                </div>
                <button className={'button'} type="submit">Войти</button>
            </form>
            <div
                onClick={() => {
                    setLightTheme(!lightTheme)
                    localStorage.setItem('theme', `${!lightTheme}`)
                }}
                className={'theme'}
            />
        </div>
    );
}

export default Login;