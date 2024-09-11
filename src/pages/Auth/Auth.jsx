import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Auth.css';
import slider1 from 'src/assets/images/hero/hero-1.jpg';
import slider2 from 'src/assets/images/hero/hero-2.jpg';
import slider3 from 'src/assets/images/hero/hero-3.jpg';
import OwlCarousel from 'react-owl-carousel';
import Swal from 'sweetalert2';
import { MDBIcon } from 'mdb-react-ui-kit';

import { useDispatch } from 'react-redux';
import { fetchLogin, fetchRegister, fetchVerifyRegister } from 'src/stores/authSlice/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import storageService from 'src/services/storage.service';
import handleResponse from 'src/utils/handleResponse';

const Login = () => {
    const [isBounceActive, setIsBounceActive] = useState(false);
    const [isHidePassword, setIsHidePassword] = useState(true);

    const { handleSubmit } = useForm();
    const [emailOrPhone, setEmailOrPhone] = useState('huydoanx305@gmail.com');
    const [password, setPassword] = useState('admin');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newBirthday, setNewBirthday] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const dispatch = useDispatch();

    const signUpButton = () => {
        setIsBounceActive(true);
    };
    const signInButton = () => {
        setIsBounceActive(false);
    };

    const loginFunc = async () => {
        await dispatch(
            fetchLogin({
                emailOrPhone,
                password,
            }),
        )
            .then(unwrapResult)
            .then((result) => {
                console.log('Fetch login result: ', result);
                if (handleResponse(result)) {
                    return;
                }
                const token = result.data.accessToken;
                const index = result.data.authorities.findIndex((authority) => {
                    return authority === 'ADMIN';
                });
                storageService.setAccessToken(token);
                if (index === -1) {
                    console.log(index);
                    window.location.href = '/';
                } else {
                    window.location.href = '/admin';
                }
            })
            .catch((error) => {
                console.log('Fetch login error: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                });
            });
    };

    const registerFunc = async () => {
        console.log(
            newEmail,
            newPassword,
            newPhoneNumber,
            newFirstName,
            newLastName,
            newGender,
            newBirthday,
            newAddress,
        );
        const formData = new FormData();
        formData.append('email', newEmail);
        formData.append('password', newPassword);
        formData.append('phoneNumber', newPhoneNumber);
        formData.append('firstName', newFirstName);
        formData.append('lastName', newLastName);
        formData.append('gender', newGender);
        formData.append('birthday', newBirthday);
        formData.append('address', newAddress);
        await dispatch(fetchRegister(formData))
            .then(unwrapResult)
            .then((result) => {
                console.log('Fetch signup result: ', result);
                if (handleResponse(result)) {
                    return;
                }
                verifyRegisterFunc();
            })
            .catch((error) => {
                console.log('Fetch signup error: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký tài khoản thất bại!',
                    text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                });
            });
    };

    const verifyRegisterFunc = async () => {
        Swal.fire({
            title: 'Input code from your email',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Enter',
            showLoaderOnConfirm: false,
            preConfirm: async (token) => {
                return await dispatch(
                    fetchVerifyRegister({
                        newEmail,
                        token,
                    }),
                )
                    .then(unwrapResult)
                    .then((result) => result);
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            console.log('wire ', result);
            if (result.isConfirmed && result.value.status.code === '00') {
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    showCancelButton: false,
                }).then((result) => {
                    window.location.href = '/login';
                });
            } else if (result.isConfirmed && result.value.status.code !== '00') {
                Swal.fire({
                    icon: 'error',
                    title: 'Xác nhận đăng ký tài khoản thất bại!',
                    text: result.value?.status?.message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!',
                    confirmButtonText: 'Nhập lại',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        verifyRegisterFunc();
                    }
                });
            }
        });
    };

    return (
        <section className="login">
            <OwlCarousel
                style={{ position: 'absolute', top: '0' }}
                className="owl-main hero-slider"
                items={1}
                loop
                autoplay
                dots={false}
            >
                <div className="item hs-item set-bg">
                    <img style={{ height: '100%' }} src={slider1} alt="" />
                </div>
                <div className="item item hs-item set-bg">
                    <img style={{ height: '100%' }} src={slider2} alt="" />
                </div>
                <div className="item item hs-item set-bg">
                    <img style={{ height: '100%' }} src={slider3} alt="" />
                </div>
            </OwlCarousel>
            <div className="user">
                <div className="user_options-container">
                    <div className="user_options-text">
                        <div className="user_options-unregistered">
                            <h2 className="user_unregistered-title">Don't have an account?</h2>
                            <p className="user_unregistered-text">
                                Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art
                                fap.
                            </p>
                            <button className="user_unregistered-signup" id="signup-button" onClick={signUpButton}>
                                Sign up
                            </button>
                        </div>
                        <div className="user_options-registered">
                            <h2 className="user_registered-title">Have an account?</h2>
                            <p className="user_registered-text">
                                Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art
                                fap.
                            </p>
                            <button className="user_registered-login" id="login-button" onClick={signInButton}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div
                        className={`user_options-forms ${isBounceActive ? 'bounceLeft' : 'bounceRight'}`}
                        id="user_options-forms"
                    >
                        <div className="user_forms-login">
                            <h2 className="forms_title">Login</h2>
                            <form className="forms_form" onSubmit={handleSubmit(loginFunc)}>
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="forms_field-input"
                                            required=""
                                            autoFocus=""
                                            value={emailOrPhone}
                                            onChange={(e) => setEmailOrPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field" style={{ position: 'relative' }}>
                                        <input
                                            type={isHidePassword ? 'password' : 'text'}
                                            placeholder="Password"
                                            className="forms_field-input"
                                            required=""
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                right: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {isHidePassword && (
                                                <MDBIcon
                                                    far
                                                    icon="eye-slash"
                                                    onClick={() => {
                                                        setIsHidePassword(!isHidePassword);
                                                    }}
                                                />
                                            )}
                                            {!isHidePassword && (
                                                <MDBIcon
                                                    far
                                                    icon="eye"
                                                    onClick={() => {
                                                        setIsHidePassword(!isHidePassword);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <button
                                        type="button"
                                        className="forms_buttons-forgot"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Enter your email to resert password',
                                                input: 'text',
                                                inputAttributes: {
                                                    autocapitalize: 'off',
                                                },
                                                showCancelButton: true,
                                                confirmButtonText: 'Enter',
                                                showLoaderOnConfirm: true,
                                                preConfirm: async (email) => {
                                                    return fetch(
                                                        `${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-password?email=${email}`,
                                                        {
                                                            method: 'POST',
                                                        },
                                                    )
                                                        .then((response) => {
                                                            console.log(response);
                                                            if (!response.ok) {
                                                                throw new Error(response.statusText);
                                                            }
                                                            return email;
                                                        })
                                                        .catch((error) => {
                                                            Swal.showValidationMessage(`Request failed: ${error}`);
                                                        });
                                                },
                                            }).then(async (result) => {
                                                const email = result.value;
                                                if (!email) {
                                                    return;
                                                }
                                                Swal.fire({
                                                    title: 'Your token is sent to ' + email,
                                                    html: `<input type="text" id="token" class="swal2-input" placeholder="Your token">
                        <input type="password" id="password" class="swal2-input" placeholder="New password">`,
                                                    confirmButtonText: 'Confirm',
                                                    focusConfirm: false,
                                                    preConfirm: async () => {
                                                        const token = Swal.getPopup().querySelector('#token').value;
                                                        const password =
                                                            Swal.getPopup().querySelector('#password').value;
                                                        if (!token || !password) {
                                                            Swal.showValidationMessage(
                                                                `Please enter token and new password`,
                                                            );
                                                        }
                                                        const response = await fetch(
                                                            `${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-password/verify?email=${email}&token=${token}&password=${password}`,
                                                            {
                                                                method: 'POST',
                                                            },
                                                        );
                                                        if (response.status != 200) {
                                                            if (!token || !password) {
                                                                Swal.showValidationMessage(
                                                                    `Please enter correct token`,
                                                                );
                                                            }
                                                        }
                                                        return await response.json();
                                                        // return { token: token, password: password };
                                                    },
                                                }).then((info) => {
                                                    Swal.fire('Cập nhật mật khẩu thành công', '', 'success');
                                                });
                                            });
                                        }}
                                    >
                                        Forgot password?
                                    </button>
                                    <input type="submit" defaultValue="Log In" className="forms_buttons-action" />
                                </div>
                            </form>
                        </div>
                        <div className="user_forms-signup">
                            <h2 className="forms_title">Sign Up</h2>
                            <form className="forms_form" onSubmit={handleSubmit(registerFunc)}>
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="forms_field-input"
                                            required=""
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="text"
                                            placeholder="Phone Nụmber"
                                            className="forms_field-input"
                                            required=""
                                            value={newPhoneNumber}
                                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="forms_field-input"
                                            required=""
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="forms_field-input"
                                            required=""
                                            value={newFirstName}
                                            onChange={(e) => setNewFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="forms_field-input"
                                            required=""
                                            value={newLastName}
                                            onChange={(e) => setNewLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <label htmlFor="male">Male</label>{' '}
                                        <input
                                            style={{ marginRight: '12px' }}
                                            id="male"
                                            type="radio"
                                            value="Male"
                                            name="gender"
                                            onChange={(e) => setNewGender(e.target.value)}
                                        />
                                        <label htmlFor="female">Female</label>{' '}
                                        <input
                                            name="gender"
                                            id="female"
                                            type="radio"
                                            value="Female"
                                            onChange={(e) => setNewGender(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="date"
                                            placeholder="Birthday"
                                            className="forms_field-input"
                                            required=""
                                            onChange={(e) => setNewBirthday(e.target.value)}
                                        />
                                    </div>
                                    <div className="forms_field">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            className="forms_field-input"
                                            required=""
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                        />
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <input type="submit" defaultValue="Sign up" className="forms_buttons-action" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
