import AbstractKit from './AbstractKit';

abstract class AbstractContainer extends AbstractKit{
    protected children: AbstractKit[] = [];


    public add(child: AbstractKit) {
        this.children.push(child);
    }
    public addChildren(target) {
        for (const child of this.children) {
            const instance = target[child.method](...child.params);
            console.log(instance)
            child.setInstance(instance);
        }
    }
    public setParent(parent) {
        super.setParent(parent);
        for (const child of this.children) {
            child.setParent(parent);
        }
    }
}

export default AbstractContainer;
