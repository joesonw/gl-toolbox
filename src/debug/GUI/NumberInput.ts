import AbstractComponent from './AbstractComponent';

interface INumberInputOptions {
    label?: string;
    onChange?: Function;
    step?: number;
    dp?: number;
    preset?: number[];
}

export default class NumberInput extends AbstractComponent {
    private opts: INumberInputOptions;
    private value: number;

    constructor(value: number, opts?: INumberInputOptions) {
        super();
        this.value = value;
        this.opts = opts;
    }
    public get method(): string {
        return 'addNumberInput';
    }
    public get params(): any[] {
        return [
            {
                value: this.value,
            },
            'value',
            this.opts,
        ];
    }
}
