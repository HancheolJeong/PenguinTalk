export const handleError = (error, navigate) => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
        alert('토큰이 유효하지 않거나 만료되었습니다. \n다시 로그인해주세요.');
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        navigate('/signin');
    } else {
        console.error("Error fetching user information:", error);
    }
};