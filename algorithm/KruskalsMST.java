// Github link project: https://github.com/suwj6601/Project_CSD301

package algorithm;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class KruskalsMST {

	// defines edge structure
	static class Edge {
		int src, dest, weight;

		public Edge(int src, int dest, int weight) {
			this.src = src;
			this.dest = dest;
			this.weight = weight;
		}
	}

	// defines subset element structure
	static class Subset {
		int parent, rank;

		public Subset(int parent, int rank) {
			this.parent = parent;
			this.rank = rank;
		}
	}

	// Starting point of program execution
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		// input edge of graph
		System.out.println("Enter the number of edges: ");
		int V = Integer.parseInt(sc.nextLine());

		// List<Edge> graphEdges = inputEdge();
		List<Edge> graphEdges = new ArrayList<Edge>(
				List.of(new Edge(0, 1, 5),
						new Edge(1, 2, 1),
						new Edge(2, 3, 4),
						new Edge(0, 3, 5),
						new Edge(1, 3, 2)));

		// List<Edge> graphEdges = new ArrayList<Edge>(
		// List.of(
		// new Edge(0, 1, 4),
		// new Edge(0, 7, 8),
		// new Edge(1, 7, 11),
		// new Edge(1, 2, 8),
		// new Edge(7, 8, 7),
		// new Edge(7, 6, 1),
		// new Edge(2, 8, 2),
		// new Edge(6, 8, 6),
		// new Edge(2, 3, 7),
		// new Edge(6, 5, 2),
		// new Edge(2, 5, 4),
		// new Edge(3, 5, 14),
		// new Edge(3, 4, 9),
		// new Edge(4, 5, 10)));

		// Step 1: sort the edges in non-decreasing order
		// (increasing with repetition allowed)
		graphEdges.sort(new Comparator<Edge>() {
			@Override
			public int compare(Edge o1, Edge o2) {
				return o1.weight - o2.weight;
			}
		});

		kruskals(V, graphEdges);
	}

	public static List<Edge> inputEdge() {
		Scanner sc = new Scanner(System.in);
		List<Edge> graphEdge = new ArrayList<Edge>();

		while (true) {
			System.out.println("Enter the source vertex: ");
			int src = Integer.parseInt(System.console().readLine());
			System.out.println("Enter the destination vertex: ");
			int dest = Integer.parseInt(System.console().readLine());
			System.out.println("Enter the weight of the edge: ");
			int weight = Integer.parseInt(System.console().readLine());
			graphEdge.add(new Edge(src, dest, weight));
			System.out.println("Do you want to continue? (Y/N)");
			String choice = sc.nextLine();
			if (choice.equalsIgnoreCase("N")) {
				break;
			} else if (choice.equalsIgnoreCase("Y")) {
				continue;
			} else {
				System.out.println("Invalid choice!");
				break;
			}

		}
		return graphEdge;
	}

	private static void kruskals(int V, List<Edge> edges) {
		int j = 0;
		int noOfEdges = 0;
		// Allocate memory for creating V subsets
		Subset subsets[] = new Subset[V];

		// Allocate memory for results
		Edge results[] = new Edge[V];

		// Create V subsets with single elements
		for (int i = 0; i < V; i++) {
			subsets[i] = new Subset(i, 0);
		}

		// Number of edges to be taken is equal to V-1
		while (noOfEdges < V - 1) {
			// Step 2: Pick the smallest edge. And increment
			// the index for next iteration
			Edge nextEdge = edges.get(j);
			int x = findRoot(subsets, nextEdge.src);
			int y = findRoot(subsets, nextEdge.dest);

			// If including this edge doesn't cause cycle,
			// include it in result and increment the index
			// of result for next edge
			if (x != y) {
				results[noOfEdges] = nextEdge;
				union(subsets, x, y);
				noOfEdges++;
			}

			j++;
		}

		// print the contents of result[] to display the built MST
		System.out.println("Following are the edges of the constructed MST:");
		System.out.println("-----------------------------------------------");
		int minCost = 0;
		for (int i = 0; i < noOfEdges; i++) {
			System.out.println(results[i].src + " - " + results[i].dest + ": " + results[i].weight);
			minCost += results[i].weight;
		}
		System.out.println("-----------------------------------------------");
		System.out.println("Total cost of MST: " + minCost);
	}

	private static void union(Subset[] subsets, int x, int y) {
		int rootX = findRoot(subsets, x);
		int rootY = findRoot(subsets, y);

		if (subsets[rootY].rank < subsets[rootX].rank) {
			subsets[rootY].parent = rootX;
		} else if (subsets[rootX].rank < subsets[rootY].rank) {
			subsets[rootX].parent = rootY;
		} else {
			subsets[rootY].parent = rootX;
			subsets[rootX].rank++;
		}
	}

	private static int findRoot(Subset[] subsets, int i) {
		if (subsets[i].parent == i)
			return subsets[i].parent;

		subsets[i].parent = findRoot(subsets, subsets[i].parent);
		return subsets[i].parent;
	}
}
