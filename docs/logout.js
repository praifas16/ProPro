// logout.js
import { getAuth } from 'firebase/auth';

function logOutUser() {
  const auth = getAuth(); // เรียกใช้งาน getAuth() จาก Firebase SDK เวอร์ชัน 9

  auth.signOut()
    .then(() => {
      // ล้าง session ที่เกี่ยวข้อง
      sessionStorage.clear();
      localStorage.clear();
      // ป้องกันการกลับไปหน้าก่อนหน้าโดยใช้ back button
      history.pushState(null, null, 'index.html');
      history.go(1);
      // เปลี่ยนเส้นทางไปที่ index.html
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Sign Out Error", error);
    });
}

export default logOutUser;
