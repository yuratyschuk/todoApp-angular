import {Task} from './task';
import {User} from './user';

export class Project {
  id: number;
  name: string;
  public userList: User[];
  public taskList: Task[];
}
