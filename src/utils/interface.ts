// ====================================
// 會員註冊
// ====================================
export interface RegisterForm {
  mail: string,
  password: string,
  confirmPassword: string
  name: string,
  note: string,
  nickName: string,
}

// ====================================
// 會員註冊
// ====================================
export interface Register {
  mail: string,
  password: string,
  name: string,
  note: string,
  nickName: string,
}

// ====================================
// 登入
// ====================================
export interface Login {
  mail: string,
  password: string
}