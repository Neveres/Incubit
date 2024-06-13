"use client";
import { useEffect, useState } from "react";
import { GraphViewer } from "@/components";

export default function Home() {
  const [graph, setGraph] = useState<Incubit.Graph>({ nodes: [], edges: [] });

  const handleEdgeLabelChange = (from: number, to: number, label: string) => {
    setGraph((prevGraph) => ({
      ...prevGraph,
      edges: prevGraph.edges.map((edge) =>
        edge.source === from && edge.target === to
          ? { ...edge, value: label }
          : edge
      ),
    }));
  };

  useEffect(() => {
    fetch("/graph.json")
      .then((response) => response.json())
      .then((data) => {
        const nodesWithPositions = data.nodes.map((node: Incubit.Node) => ({
          ...node,
          position: [
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ],
        }));

        setGraph({ ...data, nodes: nodesWithPositions });
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GraphViewer graph={graph} onEdgeLabelChange={handleEdgeLabelChange} />
    </main>
  );
}
