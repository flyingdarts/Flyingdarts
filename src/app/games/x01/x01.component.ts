import {
  Component
} from '@angular/core';
import { X01State } from './x01.state';
import { X01Store } from './x01.store';


@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss'],
  providers: [X01Store]
})
export class X01Component {
  public x01$: X01State = this.x01Store.x01$;
  constructor(private x01Store: X01Store){ }
}