export class CreateTaskDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  finished: boolean;
  // add username later
}
