export class CreateBookingDto {
  userId!: string;
  vehicleId!: string;
  vendorId!: string;
  serviceCategory!: string;
  scheduledAt?: string;
}
