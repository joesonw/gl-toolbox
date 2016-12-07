import AbstractComponent from './AbstractComponent';

interface ISliderOptions {
    label?: string;
    onChange?: Function;
    step?: number;
    dp?: number;
}

export default class Slider extends AbstractComponent {
    private opts: ISliderOptions;
    private value: number;
    private range: number[];

    constructor(value: number, range: number[], opts?: ISliderOptions) {
        super();
        this.value = value;
        this.range = range;
        if (opts.onChange) {
            const onChange = opts.onChange;
            opts.onChange = function() {
                onChange(this._slider._value);
            };
            opts['onFinish'] = function() {
                onChange(this._slider._value);
            };
        }
        this.opts = opts;
    }
    public set(value) {
        //this.instance._slider._value = value;
        console.log(this.instance)
        this.update();
    }
    public get method(): string {
        return 'addSlider';
    }
    public get params(): any[] {
        return [
            {
                value: this.value,
                range: this.range,
            },
            'value',
            'range',
            this.opts,
        ];
    }
}
