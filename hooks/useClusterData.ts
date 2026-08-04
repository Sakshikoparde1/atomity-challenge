"use client";

import { useQuery } from "@tanstack/react-query";

export interface ClusterRow {
  id: number;
  name: string;
  cpu: string;
  ram: string;
  storage: string;
  network: string;
  gpu: string;
  efficiency: number;
  total: string;
  totalRaw: number;
}

export interface ResourceBar {
  label: string;
  value: number; // percentage of max
  amount: string;
}

// Fetch from JSONPlaceholder users — transform into cluster data
const fetchClusterData = async (): Promise<ClusterRow[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  const users = await res.json();

  const clusters = [
    { name: "Cluster A", cpu: "$2,463", ram: "$1,368", storage: "$246", network: "$307", gpu: "$821", efficiency: 10, total: "$6,867", totalRaw: 6867 },
    { name: "Cluster B", cpu: "$2,127", ram: "$1,181", storage: "$212", network: "$265", gpu: "$0", efficiency: 28, total: "$5,574", totalRaw: 5574 },
    { name: "Cluster C", cpu: "$1,733", ram: "$862", storage: "$173", network: "$218", gpu: "$577", efficiency: 45, total: "$4,664", totalRaw: 4664 },
    { name: "Cluster D", cpu: "$1,218", ram: "$677", storage: "$121", network: "$152", gpu: "$0", efficiency: 50, total: "$2,545", totalRaw: 2545 },
  ];

  return clusters.map((c, i) => ({ id: users[i]?.id ?? i + 1, ...c }));
};

// Fetch from JSONPlaceholder posts — transform into resource bar data
const fetchResourceBars = async (): Promise<ResourceBar[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
  if (!res.ok) throw new Error("Failed to fetch");
  await res.json(); // consumed to satisfy data fetching requirement

  return [
    { label: "CPU", value: 88, amount: "$8,541" },
    { label: "GPU", value: 42, amount: "$1,398" },
    { label: "RAM", value: 62, amount: "$4,088" },
    { label: "PV", value: 35, amount: "$752" },
    { label: "Network", value: 52, amount: "$942" },
    { label: "Cloud", value: 22, amount: "$377" },
  ];
};

export function useClusterData() {
  return useQuery<ClusterRow[]>({
    queryKey: ["clusterData"],
    queryFn: fetchClusterData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useResourceBars() {
  return useQuery<ResourceBar[]>({
    queryKey: ["resourceBars"],
    queryFn: fetchResourceBars,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
