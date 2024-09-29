// Function to get the user's Google account profile information
function getUserInfo() {
    // eslint-disable-next-line no-undef
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        // eslint-disable-next-line no-undef
        if (chrome.runtime.lastError || !token) {
            // eslint-disable-next-line no-undef
            console.error(chrome.runtime.lastError);
            return;
        }

        // Fetch user's profile information
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((userInfo) => {
                // eslint-disable-next-line no-undef
                chrome.runtime.sendMessage({ type: "FROM_BACKGROUND", payload: { type: "LOGIN_SUCCESS", data: userInfo } });
                console.log("User Info: ", userInfo);
            })
            .catch((error) => {
                console.error("Error fetching user info: ", error);
            });
    });
}

// eslint-disable-next-line no-undef
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// eslint-disable-next-line no-undef
if (chrome.runtime.lastError) {
    // eslint-disable-next-line no-undef
    console.error("Error:", chrome.runtime.lastError.message);
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received: ", message);
    if (message.type === "LOGIN_WITH_GOOGLE") {
        getUserInfo();
    }
    if (message.type === "SEND_NOTIFICATION") {
        // eslint-disable-next-line no-undef
        chrome.notifications.create({
            type: "basic",
            iconUrl: "https://fastly.picsum.photos/id/47/100/100.jpg?hmac=_qWaxPpbFMHdU26gAMani4rFcYKZf9e_FC1FNdSIkZ8",
            title: "Test Notification",
            message: "Hey this is test notification",
            priority: 2,
            buttons: [
                { title: "Yes" },
                { title: "No" }
            ]
        }, (notificationId) => {
            console.log("Notification created with ID:", notificationId);
        });
    }
});