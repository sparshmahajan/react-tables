export class Emp {
    constructor() {
        this.graph = new Map();
        this.root = [];
        this.data = new Map();
    }

    addNode(id, parent, data) {
        this.data.set(id, data);
        if (!parent || parent === "") return this.root.push(id);

        let arr = [];
        if (this.graph.has(parent)) arr = this.graph.get(parent);
        arr.push(id);
        this.graph.set(parent, arr);
    }

    getChildrenByEmployeeId(id) {
        const nodes = this.graph.get(id);

        if (nodes) {
            return nodes.map((id) => ({
                id: id,
                data: this.data.get(id)
            }));
        }

        return [];
    }

    getRoot() {
        const nodes = this.root;
        if (nodes) {
            return nodes.map((id) => ({
                id: id,
                data: this.data.get(id)
            }));
        }

        return [];
    }
}
