export class UpdateAdminDto {
  full_name?: string;
  telegram_link?: string;
  email?: string;
  password?: string;
  admin_photo?: string;
  is_creator?: boolean;
  is_active?: boolean;
  hashed_refresh_token?: string;
}
