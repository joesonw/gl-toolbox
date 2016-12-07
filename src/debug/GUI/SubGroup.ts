import AbstractContainer from './AbstractContainer';

interface ISubGroupOptions {
    label?: string;
    useLabel?: boolean;
    enable?: boolean;
    height?: number;
}

export default class SubGroup extends AbstractContainer {
    private opts: ISubGroupOptions;
    constructor(opts?: ISubGroupOptions) {
        super();
        this.opts = opts;
    }
    public get method(): string {
        return 'addSubGroup';
    }
    public get params(): any[] {
        return [this.opts];
    }
}
