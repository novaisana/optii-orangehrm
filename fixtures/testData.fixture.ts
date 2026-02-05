

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TestData {
  validCredentials: LoginCredentials;
  invalidCredentials: {
    invalidUsername: LoginCredentials;
    invalidPassword: LoginCredentials;
  };
}


export const testData: TestData = {
  validCredentials: {
    username: 'Admin',
    password: 'admin123'
  },
  invalidCredentials: {
    invalidUsername: {
      username: 'InvalidUser',
      password: 'admin123'
    },
    invalidPassword: {
      username: 'Admin',
      password: 'InvalidPassword'
    }
  }
};
