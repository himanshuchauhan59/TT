import '../App.css';

function LoginGoogle() {

    const loginGoogleBtn = () => {
        chrome.runtime.sendMessage({ type: 'LOGIN_WITH_GOOGLE' });
    }

    return (
        <div className="d-flex justify-content-center align-items-center height-full">
            <button className='login-with-google-button' onClick={() => loginGoogleBtn()}>Login With Google</button>
        </div>
    );
}

export default LoginGoogle;