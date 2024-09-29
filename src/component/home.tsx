import React from 'react';
import '../App.css';

function Home() {
    const [userInformation, setUserInformation] = React.useState<any>(null);

    const sendNotification = () => {
        chrome.runtime.sendMessage({ type: 'SEND_NOTIFICATION' });
    }

    React.useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserInformation(JSON.parse(userInfo));
        }
    }, []);

    return (
        <div className='p-3'>
            <div className="d-flex flex-col justify-content-center align-items-center header-home">
                <h2>Hello {userInformation?.name}</h2>
                <button className='send-notification-button' onClick={() => sendNotification()}>Send Notification</button>
            </div>
        </div>
    );
}

export default Home;