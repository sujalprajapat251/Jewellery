import axios from 'axios';
import { useFormik } from 'formik';
import { ForgetPassSchema, LoginSchema } from '../schemas';
import Swal from 'sweetalert2';
import { useContext, useState, useRef } from 'react';
import noteContext from '../Context/noteContext';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login";
function Login({ isOpen, onClose, onOpen }) {
    const { Api,userHandling } = useContext(noteContext);
    // login and register with facebook

    const handleResponse = async (response) => {
        console.log("Facebook Login Response:", response);
        if (response.email) {
            console.log("Access Token:", response.email);
            var data = await axios.post(`${Api}/social-api`, {
                name: response.name,
                email: response.email,
            },
            )
            console.log('faceboookkkkk done', data.data.result);
            // localStorage.setItem("Login", JSON.stringify(data.data.result));
            userHandling(data.data.result);
            onClose();
        } else {
            console.error("Facebook login failed", response);
        }
    };

    // login or register by google
    const handleSuccess = async (response) => {
        const token = response.credential; // Get the Google JWT
        const user = jwtDecode(token); // Decode the JWT to get user details
        console.warn("User Info:", user);
        if (user) {
            var data = await axios.post(`${Api}/social-api`, {
                name: user.name,
                email: user.email,
            },
            )
            console.log(data);
            // localStorage.setItem("Login", JSON.stringify(data.data.result));
            userHandling(data.data.result);
            onClose();
        }
        // Example: { email, name, sub (Google UID), picture, etc. }
    };

    const handleFailure = (error) => {
        console.error("Login Failed:", error);
    };


    // Login Model
    const loginVal = {
        email: '',
        password: '',
    }

    const LoginFormik = useFormik({
        initialValues: loginVal,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post(`${Api}/auth/login`, {
                    email: values.email,
                    password: values.password,
                });

                console.log("LoginRes", response.data);

                if (response?.data?.result) {

                    Swal.fire({
                        position: "top-end",
                        toast: true,
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: true,
                        background: "green",
                        color: "white",
                        iconColor: "white"
                    });
                    userHandling(response?.data?.result);
                    onClose();
                } else {
                    alert("Unexpected login response. Please try again.");
                    Swal.fire({
                        position: "top-end",
                        toast: true,
                        icon: "error",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: true,
                        background: "black",
                        color: "white",
                        iconColor: "green"
                    });
                }
            } catch (e) {

            }
        }
    })



    // forgot password Model
    const [showForPass, setShowForPass] = useState(false);

    const handleForPassClose = () => setShowForPass(false);
    const handleForPassShow = () => setShowForPass(true);

    const ForgetPassVal = {
        email: '',
    }

    const ForgetPassFormik = useFormik({
        initialValues: ForgetPassVal,
        validationSchema: ForgetPassSchema,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post(`${Api}/password/email`, {
                    email: values.email,
                });

                console.log("ForgetRes", response.data);

                alert("A reset password email has been sent to your email address.");
                handleForPassClose();
                handleOTPShow();

                action.resetForm();
            } catch (error) {
                console.error("Error during forgot password request:", error);
                alert(
                    error.response?.data?.message ||
                    "Failed to send reset password email. Please try again."
                );
            }
        },
    });



    // Verify Otp Model
    const [showOTP, setShowOTP] = useState(false);

    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);

    const [storeOtp, setStoreOtp] = useState("")

    const OtpVal = {
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: ''
    }

    const OtpFormik = useFormik({
        initialValues: OtpVal,
        onSubmit: async (values, action) => {
            try {
                const otpValue = parseInt(values.otp1 + values.otp2 + values.otp3 + values.otp4);

                const response = await axios.post(`${Api}/password/otp`, {
                    otp: otpValue,
                });

                console.log("OtpRes", response.data);
                handleOTPClose();
                handleResetPassShow();
                setStoreOtp(otpValue);
                action.resetForm();

            } catch (error) {
                console.error("Error during OTP verification:", error);

                alert(
                    error.response?.data?.message ||
                    "Failed to verify OTP. Please check the OTP and try again."
                );
            }
        },
    });


    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);



    // Reset Password Model
    const [showResetPass, setShowResetPass] = useState(false);

    const handleResetPassClose = () => setShowResetPass(false);
    const handleResetPassShow = () => setShowResetPass(true);

    const ResetPassVal = {
        newPass: '',
        conPass: '',
    }

    const ReserPassFormik = useFormik({
        initialValues: ResetPassVal,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post(`${Api}/password/reset/${storeOtp}`, {
                    new_password: values.newPass,
                    confirm_password: values.conPass,
                });
                console.log("ResetPassRes", response.data);
                alert("Your password has been reset successfully. Please log in with your new password.");
                handleResetPassClose();
                // handleLoginShow();
                onOpen();
                action.resetForm();
            } catch (error) {
                console.error("Error resetting password:", error);
                alert(
                    error.response?.data?.message ||
                    "Failed to reset the password. Please try again."
                );
            }
        },
    });




    // SignUp Model
    const [showRegister, setShowRegister] = useState(false);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const [signUpVal, setSignUpVal] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    })

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Api}/user/create`, {
                name: signUpVal.name,
                phone: signUpVal.phone,
                email: signUpVal.email,
                password: signUpVal.password,
                role_id: 2,
                dob: "2001-01-01",
            });

            console.warn("SignUp Response:", response);

            alert("Registration successful! Please log in.");

            setShowRegister(false);
            onOpen();
        } catch (error) {
            console.error("Error during registration:", error);

            alert(
                error.response?.data?.message ||
                "Failed to register. Please check your details and try again."
            );
        }
    };

    return (
        <>
            {/* LoginModel */}

            <Modal show={isOpen} onHide={onClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={LoginFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Login</h2>
                            <p>Login to your existing account to access your account</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='email' name='email' value={LoginFormik.values.email} onChange={LoginFormik.handleChange} onBlur={LoginFormik.handleBlur} placeholder='Enter email'></input>
                            {LoginFormik.errors.email && LoginFormik.touched.email ? <p className='ds_new-danger mb-0'>{LoginFormik.errors.email}</p> : null}

                        </div>
                        <div className='s_modal_field'>
                            <p>Password</p>
                            <input type='password' name='password' value={LoginFormik.values.password} onChange={LoginFormik.handleChange} onBlur={LoginFormik.handleBlur} placeholder='Enter password'></input>
                            {LoginFormik.errors.password && LoginFormik.touched.password ? <p className='ds_new-danger mb-0'>{LoginFormik.errors.password}</p> : null}
                            <span className='d-flex justify-content-end' onClick={() => {
                                onClose();
                                handleForPassShow();
                            }}><Link to={'#'} >Forgot Password?</Link></span>
                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Login</button>
                        </div>
                    </form>

                    <div className='s_modal_or d-flex my-3'>
                        <div className='s_modal_line'></div>
                        <small>OR</small>
                        <div className='s_modal_line'></div>
                    </div>
                    <div className='s_modal_btn2' >
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleFailure}
                            text="signin_with"
                            className='s_modal_btn2'
                        />
                    </div>
                    <div className='s_modal_btn2' >
                        <FacebookLogin
                            appId="3443333199307811" // Replace with your Facebook App ID
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="" // Use the 'email' scope only
                            callback={handleResponse}
                            text='signin_with'
                            icon='fa-facebook'
                            cssClass='s_facebook_btn'
                            textButton='Sign in with Facebook'
                        ><img src={require('../Img/Sujal/facebook.png')} alt='facebook'></img>
                            <p className='mb-0'>Sign in with Facebook</p></FacebookLogin>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <span className='d-flex' onClick={() => {
                        onClose();
                        handleRegisterShow();
                    }}><p>Didn’t have any account?</p><Link to={'#'} > Signup</Link></span>
                </Modal.Footer>
            </Modal>

            {/* forget  password*/}
            <Modal show={showForPass} onHide={handleForPassClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={ForgetPassFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Forgot Password</h2>
                            <p>Enter your email below to recover your password</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='text' name='email' value={ForgetPassFormik.values.email} onChange={ForgetPassFormik.handleChange} onBlur={ForgetPassFormik.handleBlur} placeholder='Enter email'></input>
                            {ForgetPassFormik.errors.email && ForgetPassFormik.touched.email ? <p className='ds_new-danger mb-0'>{ForgetPassFormik.errors.email}</p> : null}

                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Send Code</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>



            {/* otp modal */}
            <Modal show={showOTP} onHide={handleOTPClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={OtpFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Verify OTP</h2>
                            <p>Enter verification code which we’ve sent to your registered email</p>
                        </div>
                        <div className='s_modal_otp d-flex justify-content-between mx-4'>
                            <input ref={otp1Ref} maxLength="1" type='text' name='otp1' value={OtpFormik.values.otp1} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp2Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp1) { e.preventDefault(); } }}></input>
                            <input ref={otp2Ref} maxLength="1" type='text' name='otp2' value={OtpFormik.values.otp2} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp3Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp2) { otp1Ref.current.focus(); } }}></input>
                            <input ref={otp3Ref} maxLength="1" type='text' name='otp3' value={OtpFormik.values.otp3} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp4Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp3) { otp2Ref.current.focus(); } }}></input>
                            <input ref={otp4Ref} maxLength="1" type='text' name='otp4' value={OtpFormik.values.otp4} onChange={OtpFormik.handleChange} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp4) { otp3Ref.current.focus(); } }}></input>
                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Verify</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            {/* reset password */}
            <Modal show={showResetPass} onHide={handleResetPassClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={ReserPassFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Reset Password</h2>
                            <p>Reset your password & create new password</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>New Password</p>
                            <input type='password' name='newPass' value={ReserPassFormik.values.newPass} onChange={ReserPassFormik.handleChange} onBlur={ReserPassFormik.handleBlur} placeholder='New Password'></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Confirm New Password</p>
                            <input type='password' name='conPass' value={ReserPassFormik.values.conPass} onChange={ReserPassFormik.handleChange} onBlur={ReserPassFormik.handleBlur} placeholder='Confirm New Password'></input>
                        </div>
                        <div className='s_modal_btn' >
                            <button type='submit'>Reset Password</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            {/* register modal */}
            <Modal show={showRegister} onHide={handleRegisterClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={handleSignUp}>
                        <div className='s_modal_head text-center' >
                            <h2>Create Account</h2>
                            <p>Create an account & get access to exclusive collection of jewelry</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Name</p>
                            <input type='text' placeholder='Enter name' value={signUpVal.name} onChange={(e) => setSignUpVal({ ...signUpVal, name: e.target.value })} ></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Mobile No.</p>
                            <input type='text' placeholder='Enter mobile no.' value={signUpVal.phone} onChange={(e) => setSignUpVal({ ...signUpVal, phone: e.target.value })}></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='text' placeholder='Enter email' value={signUpVal.email} onChange={(e) => setSignUpVal({ ...signUpVal, email: e.target.value })}></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Password</p>
                            <input type='password' placeholder='Enter password' value={signUpVal.password} onChange={(e) => setSignUpVal({ ...signUpVal, password: e.target.value })}></input>
                        </div>
                        <div className='s_modal_btn' onClick={(e) => handleSignUp(e)}>
                            <button type='submit' >Register</button>
                        </div>
                    </form>

                    <div className='s_modal_or d-flex my-3'>
                        <div className='s_modal_line'></div>
                        <small>OR</small>
                        <div className='s_modal_line'></div>
                    </div>
                    <div className='s_modal_btn2'>
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleFailure}
                            text="signup_with"
                            className='s_modal_btn2'
                        />
                    </div>
                    <div className='s_modal_btn2'>
                        <FacebookLogin
                            appId="3443333199307811" // Replace with your Facebook App ID
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="" // Use the 'email' scope only
                            callback={handleResponse}
                            text='signin_with'
                            icon='fa-facebook'
                            cssClass='s_facebook_btn'
                            textButton='Sign up with Facebook'
                        ><img src={require('../Img/Sujal/facebook.png')} alt='facebook'></img>
                            <p className='mb-0'>Sign in with Facebook</p></FacebookLogin>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center' onClick={() => {
                    handleRegisterClose();
                    onOpen();
                }
                }>
                    <span className='d-flex'><p>Already have an account?</p><Link to={'#'}> Signin</Link></span>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Login;