"use client";

import { useQuery } from "@tanstack/react-query";

export interface Metric {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  category: string;
  description: string;
}

export interface Insight {
  id: number;
  title: string;
  body: string;
  tag: string;
  savings: string;
}

// Transform JSONPlaceholder users into KPI metrics
const fetchMetrics = async (): Promise<Metric[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch metrics");
  const users = await res.json();

  const metricTemplates = [
    { title: "Monthly Spend", value: "$84,320", change: "-23%", trend: "down" as const, category: "Cost", description: "Total Kubernetes infrastructure spend this month" },
    { title: "Savings Identified", value: "$61,200", change: "+70%", trend: "up" as const, category: "Optimization", description: "Potential savings from optimization insights" },
    { title: "Active Clusters", value: "14", change: "+2", trend: "up" as const, category: "Infrastructure", description: "Clusters monitored across all cloud providers" },
    { title: "Idle Resources", value: "38%", change: "-12%", trend: "down" as const, category: "Waste", description: "Compute resources running below 10% utilization" },
    { title: "Avg CPU Usage", value: "42%", change: "+5%", trend: "up" as const, category: "Performance", description: "Average CPU utilization across all workloads" },
    { title: "Budget Alerts", value: "3", change: "-5", trend: "down" as const, category: "Alerts", description: "Active budget threshold alerts requiring attention" },
  ];

  return metricTemplates.map((template, i) => ({
    id: users[i]?.id ?? i + 1,
    ...template,
  }));
};

// Transform JSONPlaceholder posts into optimization insights
const fetchInsights = async (): Promise<Insight[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
  if (!res.ok) throw new Error("Failed to fetch insights");
  const posts = await res.json();

  const insightTemplates = [
    { title: "Right-size over-provisioned nodes", tag: "Compute", savings: "$18,400/mo" },
    { title: "Remove unused persistent volumes", tag: "Storage", savings: "$4,200/mo" },
    { title: "Consolidate low-utilization clusters", tag: "Clusters", savings: "$22,100/mo" },
    { title: "Optimize spot instance mix", tag: "Pricing", savings: "$16,500/mo" },
  ];

  return posts.map((post: { id: number; body: string }, i: number) => ({
    id: post.id,
    title: insightTemplates[i].title,
    body: post.body.slice(0, 80) + "...",
    tag: insightTemplates[i].tag,
    savings: insightTemplates[i].savings,
  }));
};

export function useMetrics() {
  return useQuery<Metric[]>({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000,
  });
}

export function useInsights() {
  return useQuery<Insight[]>({
    queryKey: ["insights"],
    queryFn: fetchInsights,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
