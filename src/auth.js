function registerUser(db, formData) {
    return db.collection(formData.role)
      .where("Email", "==", formData.email)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          throw new Error("Email is already in use");
        } else {
          return db.collection(formData.role).add({
            Username: formData.username,
            Email: formData.email,
            Password: formData.password,
            Role: formData.role,
            Time: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
          });
        }
      });
  }
  
  module.exports = { registerUser };
  