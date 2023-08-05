export class UpdateCustomerDto {
  first_name?: string;
  last_name?: string;
  telegram_link?: string;
  email?: string;
  password?: string;
  customer_photo?: string;
  phone_number?: string;
  birthdate?: Date;
  is_active?: boolean;
  location_id?: number;
  hashed_refresh_token?: string;
  activation_link?: string;
}
