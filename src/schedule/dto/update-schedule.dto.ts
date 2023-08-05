export class UpdateScheduleDto {
  customer_id?: number;
  employee_id?: number;
  service_type_id?: number;
  scheduled_date?: Date;
  start_time?: string;
  finish_time?: string;
  status?: string;
}
