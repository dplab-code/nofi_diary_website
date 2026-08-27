export type InitiativeStatus = "planned" | "active" | "completed" | "cancelled";
export type ExperimentStatus = "backlog" | "running" | "concluded";

export type MarketingInitiative = {
  id: string;
  title: string;
  channel: string;
  startsOn: string;
  endsOn?: string;
  description: string;
  objective: string;
  status: InitiativeStatus;
  campaignId: string;
  notes?: string;
  outcome?: string;
};

export type Experiment = {
  id: string;
  title: string;
  hypothesis: string;
  action: string;
  observationStartsOn: string;
  observationEndsOn: string;
  status: ExperimentStatus;
  result?: string;
  decision?: string;
  initiativeIds: string[];
};

export type MetricObservation = {
  provider: string;
  metric: string;
  startsAt: string;
  endsAt: string;
  value: number;
  dimensions: Record<string, string>;
};

export type ObservationQuery = {
  startsAt: string;
  endsAt: string;
  metrics: string[];
};

/** Provider implementations return aggregate observations and remain independent of the Hub domain. */
export interface ObservabilityProvider {
  readonly id: string;
  readonly displayName: string;
  read(query: ObservationQuery): Promise<MetricObservation[]>;
}
