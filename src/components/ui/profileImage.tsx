
export default function ProfileImage() {
    // localStorage에서 user 정보를 가져오고, JSON 파싱
    const userStr = localStorage.getItem('user');
    let img = "";
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            img = user.profileImage || "";
        } catch (e) {
            img = "";
        }
    }
    return (
        <img src={img} alt="profile" width={"40rem"} className="rounded-full" />
    )
}