abstract class AbstractKit {
    public abstract get method(): string;
    public abstract get params(): any[];
    protected instance;
    public setInstance(instance) {
        this.instance = instance;
    }
    protected parent;
    public setParent(parent) {
        this.parent = parent;
    }
    protected update() {
        this.parent.update();
    }
}

export default AbstractKit;
