export class CreateTaskDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  finish: boolean;
  // add username later
}
