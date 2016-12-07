import AbstractContainer from './AbstractContainer';

interface IGroupOptions {
    label?: string;
    useLabel?: boolean;
    enable?: boolean;
    height?: number;
}

export default class Group extends AbstractContainer {
    private opts: IGroupOptions;
    constructor(opts?: IGroupOptions) {
        super();
        this.opts = opts;
    }
    public get method(): string {
        return 'addGroup';
    }
    public get params(): any[] {
        return [this.opts];
    }
}
