// import { Proceses } from '../settings/workflow/workflow.component';
import { Process } from './process.model';
export class Part {
  name: string;
  processes: Process[] = [];
  id?: string;

  total_duration?: number;
  working_duration?: number;
  step_finished?: boolean;
  step_finished_duration?: number;

  incrementWork?(): void {
    this.total_duration += 1;
    this.working_duration += 1;
    this.step_finished = this.working_duration === this.step_finished_duration;
  }

  pop?(): Process {
    const p = this.processes.splice(0, 1);
    return p[0];
  }
}
