
function getGoogleOAuthUrl(){
    const rootUrl = 'http://accounts.google.com/o/oauth2/v2/auth'; // Constant
    const options = { 
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OUATH_REDIRECT_URL as string,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthUrl;