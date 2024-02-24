/**
 * API요청중 발생한 에러 처리하는 함수
 * 401, 419의 경우에는 토큰이 만료되었으므로, 로그인 페이지로 리다이렉트합니다.
 * 나머지는 콘솔창에서 출력됩니다.
 * @param {*} error : 에러 객체
 * @param {*} navigate : 다른 경로로 이동하기 위한 navigate
 */
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