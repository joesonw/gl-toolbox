const Kit = require('controlkit');
import AbstractKit from './AbstractKit';
import AbstractContainer from './AbstractContainer';

interface IPanelOption {
    label?: string;
    width?: number;
    ratio?: number;
    align?: string;
    fixed?: boolean;
    position?: number[];
    opacity?: number;
    dock?: boolean;
}

export default class GUI {
    private instance;
    private kit;
    constructor(opts?: IPanelOption) {
        this.kit = new Kit();
        this.instance = this.kit.addPanel(opts);
    }
    add(child: AbstractKit) {
        const childInstance = this.instance[child.method](...child.params);
        if (child instanceof AbstractContainer) {
            const container = <AbstractContainer>child;
            container.addChildren(childInstance);
            container.setParent(this);
        }
    }
    update() {
        this.kit.update();
    }
}
