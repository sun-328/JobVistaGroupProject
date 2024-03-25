import React, { useState, useRef } from 'react';
import { Button } from '../Button/Button';
import Validation from './Validation';
import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import Style from '../SignUp/SignUp.module.css';
import { Heading } from '../Heading/Heading';
import { Popup } from '../Popup/Popup';

export const SignUp = () => {
    const get = useRef();
    const [personalForm, isPersonalForm] = useState(true);
    const [orgForm, isOrgForm] = useState(false);
    const [already, setAlready] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        admin: {
            name: '',
            email: '',
            password: '',
        },
        organization: {
            orgName: '',
            orgType: '',
            orgIn: '',
            orgEmail: '',
            orgNo: '',
        }
    });
    localStorage.setItem("domain", "localhost:8080")
    const domain = localStorage.getItem("domain");

    const [viewPassword, setViewPassword] = useState(false);


    const alreadyAcc = () => {
        setAlready(true);
    }

    const notAcc = () => {
        setAlready(false);
    }

    const nextBtn = (e) => {
        localStorage.setItem("domain", "localhost:8080");
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (Object.values(validationErrors).length === 0) {
            isPersonalForm(false);
            isOrgForm(true);
        }
    }

    const startBtn = (e) => {
        e.preventDefault();
        const orgObj = {
            orgName: values.orgName,
            orgType: values.orgType,
            industry: values.orgIn,
            contactEmail: values.orgEmail,
            contactNumber: values.orgNo
        };
        const adminObj = {
            adminName: values.name,
            adminEmail: values.email,
            adminPassword: values.password
        };
        const obj = {
            admin: adminObj,
            organization: orgObj
        };
        setValues({ obj });
        const SignUp = () => {
            fetch(`http://${domain}/JobVista/SignUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to sign up');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.statusCode === 200) {
                        console.log('Sign up successful:', data);
                        localStorage.setItem('userDetails', JSON.stringify(data.userDetails));
                        // return(
                        //   <Popup isSuccess='true' content={data.message} /> 
                        // )
                        navigate('/admin');
                    } else {
                        console.log('Failed to Sign up:', data);
                        // return(
                        //   <Popup isSuccess='false' content={data.message} />
                        // )
                    }
                })
                .catch(error => {
                    console.error('Error signing up:', error);
                });
        };
        SignUp();


    };

    const Login = (e) => {
        e.preventDefault();

        // localStorage.setItem("domain", "localhost:8080")
        const obj = {
            email: values.email,
            password: values.password
            // email: "jane@abccompany.com",
            // password: "Asdf@123"
        }

        // const validationErrors = Validation(obj);
        // setErrors(validationErrors);
        // if (Object.values(validationErrors).length === 0) {
            fetch(`http://${domain}/JobVista/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to login');
                    }

                    return response.json();
                })
                .then(data => {
                    if (data.statusCode === 200) {
                        console.log('Logged in successful:', data);
                        localStorage.setItem('userDetails', JSON.stringify(data.userDetails));
                        console.log(data.userDetails)
                        
                        if (data.userDetails.role == "admin") {
                            // return(
                            //     <Popup isSuccess='true' content={data.message} /> 
                            //   )
                            alert("Login Successfully");
                            navigate('/admin');
                            
                        }
                        else {
                            navigate('/panelist');
                        }
                    }
                    else {
                        console.log('Failed to Login:', data);
                        // return(
                        //   <Popup isSuccess='false' content={data.message} />
                        // )
                    }
                })
                .catch(error => {
                    console.error('Error logging in:', error);
                });
        // }

        return false;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div Style="width: 100%; height: 100%;">

            <div id={Style.form}>

                {orgForm && (
                    <form id={Style.formId}>
                        <div>
                            <Heading id={Style.register}>Application Form</Heading>
                            <Text id={Style.txt}>Fill the details below</Text>
                        </div>

                        <div id={Style.orgForm}>
                            {/* <Text>Organization Name</Text> */}
                            <div className={Style.mainInput} id={Style.forInput}>
                                <div className={Style.commonIconStyle}><i class="fa-solid fa-building"></i></div>
                                <Input ref={get} className={Style.inputBox} onChange={handleChange} placeholder='Eg.SmartLearn Foundation' name='orgName' />
                            </div>

                            {/* <Text>Organization Type</Text> */}
                            {/* <Input className={Style.inputBox} onChange={handleChange} placeholder='Organization type' name='orgType' /> */}
                            <div className={Style.mainInput} id={Style.forInput}>
                                <div className={Style.commonIconStyle}><i class="fa-solid fa-clipboard-list"></i></div>
                                <input list='types' id={Style.type} className={Style.inputBox} onChange={handleChange} placeholder='Eg.SmartLearn Foundation' name='orgType' />
                                <datalist id='types'>
                                    <option value='Public' />
                                    <option value='Private' />
                                </datalist>
                            </div>

                            {/* <Text>Industry</Text> */}
                            <div className={Style.mainInput} id={Style.forInput}>
                                <div className={Style.commonIconStyle}><i class="fa-solid fa-industry"></i></div>
                                <Input className={Style.inputBox} onChange={handleChange} placeholder='Eg. Education' name='orgIn' />
                            </div>

                            {/* <Text>Contact Email</Text> */}
                            <div className={Style.mainInput} id={Style.forInput}>
                                <div className={Style.commonIconStyle}><i class="fa-solid fa-envelope"></i></div>
                                <Input className={Style.inputBox} onChange={handleChange} placeholder='Eg. example@example.com' name='orgEmail' />
                            </div>

                            {/* <Text>Contact Number</Text> */}
                            <div className={Style.mainInput} id={Style.forInput}>
                                <div className={Style.commonIconStyle}><i class="fa-solid fa-phone"></i></div>
                                <Input className={Style.inputBox} onChange={handleChange} placeholder='Eg. 8126479410' name='orgNo' />
                            </div>
                        </div>

                        <div id={Style.buttonDiv} className={Style.btnDiv}>
                            <Link to='/'>
                                <Button id={Style.cancelBtn} className={Style.btn}>Cancel</Button>
                            </Link>

                            <Button id={Style.nextBtn} className={Style.btn} onClick={startBtn}>Start</Button>
                        </div>

                    </form>
                )}
                <div id={Style.image}></div>

                {personalForm && (
                    <form id={Style.formId}>
                        <div>
                            <Heading id={Style.register}>Register</Heading>
                            <Text id={Style.txt}>to access JobVista</Text>
                        </div>

                        {!already ? (
                            <div id={Style.formInput}>
                                <div className={Style.mainInput}>
                                    <div className={Style.commonIconStyle}><i class="fa-solid fa-user"></i></div>
                                    <Input name='name' type='text' placeholder='Enter your name' className={Style.inputBox} onChange={handleChange} />
                                </div>
                                {errors.name && <Text className={Style.err}>{errors.name}</Text>}

                                <div className={Style.mainInput}>
                                    <div className={Style.commonIconStyle}><i class="fa-solid fa-paper-plane"></i></div>
                                    <Input name='email' type='email' placeholder='Enter your email' className={Style.inputBox} onChange={handleChange} />
                                </div>
                                {errors.email && <Text className={Style.err}>{errors.email}</Text>}

                                <div className={Style.mainInput}>
                                    <div className={Style.commonIconStyle}><i class="fa-solid fa-lock"></i></div>
                                    <Input name='password' type={viewPassword ? 'text' : 'password'} placeholder='Enter your password' className={Style.inputBox} onChange={handleChange} />
                                    {viewPassword ? <i id={Style.thisIcon} class="fa-regular fa-eye" onClick={() => setViewPassword(false)}></i> : <i id={Style.thisIcon} class="fa-regular fa-eye-slash" onClick={() => setViewPassword(true)}></i>}
                                </div>
                                {errors.password && <Text className={Style.err}>{errors.password}</Text>}

                                <Text id={Style.content} onClick={already ? notAcc : alreadyAcc}>{!already ? 'Already have an account ?' : "Don't have an account?"}</Text>
                            </div>
                        ) :
                            <div id={Style.logInput}>
                                <div className={Style.mainInput}>
                                    <div className={Style.commonIconStyle}><i class="fa-solid fa-paper-plane"></i></div>
                                    <Input name='email' type='email' placeholder='Enter your email' className={Style.inputBox} onChange={handleChange} />
                                </div>
                                {errors.email && <Text className={Style.err}>{errors.email}</Text>}

                                <div className={Style.mainInput}>
                                    <div className={Style.commonIconStyle}><i class="fa-solid fa-lock"></i></div>
                                    <Input name='password' type={viewPassword ? 'text' : 'password'} placeholder='Enter your password' className={Style.inputBox} onChange={handleChange} />
                                    {viewPassword ? <i id={Style.thisIcon} class="fa-regular fa-eye" onClick={() => setViewPassword(false)}></i> : <i id={Style.thisIcon} class="fa-regular fa-eye-slash" onClick={() => setViewPassword(true)}></i>}
                                </div>
                                {errors.password && <Text className={Style.err}>{errors.password}</Text>}

                                <Text id={Style.content} onClick={already ? notAcc : alreadyAcc}>{!already ? 'Already have an account ?' : "Don't have an account?"}</Text>
                            </div>
                        }

                        <div id={Style.buttonDiv}>
                            <Link to='/'>
                                <Button id={Style.cancelBtn} className={Style.btn}>Cancel</Button>
                            </Link>

                            {!already ? <Button id={Style.nextBtn} className={Style.btn} onClick={nextBtn}>Next</Button> : <Button id={Style.buton} onClick={Login}>Log In</Button>}
                        </div>
                    </form>
                )}

            </div>
            {/* <Popup isSuccess='false' content='Failed'/> */}
        </div>
    )
}

// fetch('url', {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json'
//     },
//     body: JSON.stringify(userObj)
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // setUser(data);
//     })