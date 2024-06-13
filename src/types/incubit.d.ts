declare namespace Incubit {
  interface Node {
    id: number;
    name: string;
    path: string;
    position: [number, number, number];
  }

  interface Edge {
    id: number;
    source: number;
    target: number;
    value: string;
  }

  interface Graph {
    nodes: Node[];
    edges: Edge[];
  }
}
