import axiosInstance from "./axiosInstance";

interface AuthResponse {
  message: string;
  data?: any;
  token?: string;
  tokenExpiresAt?: number;
}

interface UpdateUserDetails {
  email?: string;
  password?: string;
  recoveryEmail?: string;
}

const authService = {
  // Signup with email and password
  signupWithEmailAndPassword: async (
    email: string,
    password: string,
    role: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/signup/emailandpassword",
        { email, password, role },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (userId: string, token: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.get<AuthResponse>(
        `/auth/verify?user=${userId}&token=${token}`,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Login
  login: async (
    email: string,
    password: string,
    role: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/login", {
        email,
        password,
        role,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Update user details
  updateUserDetails: async (
    token: string,
    details: UpdateUserDetails,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.put<AuthResponse>(
        "/auth/update",
        details,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Delete account
  deleteAccount: async (
    token: string,
    email: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.delete<AuthResponse>(
        `/auth/delete?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Disable account
  disableAccount: async (
    token: string,
    email: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.put<AuthResponse>(
        "/auth/disable",
        { email },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/forgot-password",
        { email },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (
    resetToken: string,
    newPassword: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `/auth/reset-password?resetToken=${resetToken}`,
        { newPassword },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Admin signup
  adminSignup: async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/signup/admin",
        { email, password },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Check if token is valid
  isValid: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.get<AuthResponse>("/auth/is-valid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  reAuthenticate: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/reauthenticate",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default authService;
