document.getElementById("logoutLink").addEventListener("click", function(event) {
  event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บหรือการทำงานเริ่มต้น
  window.location.href = "index.html"; // เปลี่ยนเส้นทางไปยังหน้า index.html
});
