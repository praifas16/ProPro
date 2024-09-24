class User {
    constructor(username, email, password, role) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  
    register(db) {
      return db.collection(this.role)
        .where("Email", "==", this.email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            throw new Error("Email is already in use");
          } else {
            return db.collection(this.role).add({
              Username: this.username,
              Email: this.email,
              Password: this.password,
              Role: this.role,
              Time: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
            });
            alert('การลงทะเบียนสำเร็จ! รหัส ID ของคุณ: ' + docRef.id);

          }
        });
    }
  }
  
  module.exports = User;
  