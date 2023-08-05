export class UpdateEmployeeDto {
  first_name?: string;
  last_name?: string;
  telegram_link?: string;
  email?: string;
  password?: string;
  employee_photo?: string;
  phone_number?: string;
  passport_seria?: string;
  rating?: number;
  gender?: string;
  is_active?: boolean;
  hashed_refresh_token?: string;
  activation_link?: string;
}
