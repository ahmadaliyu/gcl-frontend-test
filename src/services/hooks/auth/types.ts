interface User {
  id: string;
  role_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email: string;
  account_type: string;
  business_name?: string;
  business_phone?: string;
  gender: string;
  email_verified_at: string | null;
  account_status: string;
  two_fa: boolean;
  notification_settings: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  last_login: string;
  ref_code: string;
  ref_by?: string;
  marketing_communications: boolean;
  promotional_emails: boolean;
  shipping_emails: boolean;
  how_you_found_us?: string;
  createdAt: string;
  updatedAt: string;
  Role: {
    slug: string;
  };
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    success: boolean;
    message: any;
    slug: any;
    user: {
      id: string;
      role_id: string;
      first_name: string;
      last_name: string;
      middle_name: string | null;
      phone: string;
      email: string;
      account_type: string;
      business_name: string;
      business_phone: string;
      gender: string;
      password: string;
      password_expires_at: string | null;
      password_last_changed_at: string | null;
      password_login_attempt: number;
      password_lockout_duration: number;
      password_lockout_time: string | null;
      email_verified_at: string | null;
      account_status: 'active' | 'inactive' | 'suspended' | 'pending';
      two_fa: boolean;
      notification_settings: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      last_login: string | null;
      ref_code: string;
      ref_by: string | null;
      marketing_communications: boolean;
      promotional_emails: boolean;
      shipping_emails: boolean;
      how_you_found_us: string;
      createdAt: string;
      updatedAt: string;
      Role: {
        id: string;
        title: string;
        slug: string;
      };
    };
    token: string;
    refresh: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  data: { message: string; success: boolean; user: User, token: string, refresh: string };
  success: boolean;
  message: string;
  status: number;
}

export type TgoogleAuthService = {
  payload: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  };
};

export type TfacebookAuthService = {
  payload: {
    name: string;
    email: string;
    picture: {
      data: {
        url: string;
      };
    };
    id: string;
    accessToken: string;
  };
};

export type TValidateTokenService = {
  payload: {
    token: string;
  };
};

export type TForgotService = {
  payload: {
    email?: string;
  };
};

export type TResetService = {
  payload: {
    newPassword?: string;
    confirmNewPassword?: string;
    otp?: number | null;
  };
};
export type T = {
  payload: {
    content: string;
    parentId: string;
  };
};
