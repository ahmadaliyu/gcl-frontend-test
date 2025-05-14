export interface UserResponse {
    status: number;
    success: boolean;
    message: string;
    user: {
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
    };
}
