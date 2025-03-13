const bcrypt = require("bcryptjs");

const plainPassword = "12345"; // Thay đổi mật khẩu admin nếu cần
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

console.log("Mật khẩu băm:", hashedPassword);
