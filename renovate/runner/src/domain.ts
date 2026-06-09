export const VALID_LANES = ["code", "github-actions"] as const;

export type Lane = (typeof VALID_LANES)[number];
export type Repo = string;

export type Cohort = {
    name: string;
    days: ReadonlyArray<number>;
    repos: ReadonlyArray<Repo>;
};

export type LaneConfig = {
    cohorts: ReadonlyArray<Cohort>;
};

export type Config = Record<Lane, LaneConfig>;

export type Workload = {
    kind: Lane;
    shouldRun: boolean;
    dayOfMonth: number;
    configurationFile: string;
    cohortNames: ReadonlyArray<string>;
    repositories: ReadonlyArray<Repo>;
};

const VALID_LANE_SET = new Set<string>(VALID_LANES);

export const isLane = (value: string): value is Lane =>
    VALID_LANE_SET.has(value);
