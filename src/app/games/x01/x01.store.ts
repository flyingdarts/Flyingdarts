@Injectable()
export class X01Store extends ComponentStore<X01State> {
  constructor() {
    super({x01: initialState});
  }
 
  readonly x01$: Observable<X01State> = this.select(state => state.x01);
}