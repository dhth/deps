import type { Lane } from "./domain";
import { isLane, VALID_LANES } from "./domain";

const USAGE = "usage: choose-repos.ts <lane> <YYYY-MM-DD>";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type Args = {
    lane: Lane;
    dayOfMonth: number;
};

export const parseLane = (value: string): Lane => {
    if (!isLane(value)) {
        throw new Error(
            `invalid lane '${value}'; expected one of: ${VALID_LANES.join(", ")}`,
        );
    }

    return value;
};

export const parseDate = (value: string): Date => {
    if (!DATE_RE.test(value)) {
        throw new Error(`invalid date '${value}'; expected format YYYY-MM-DD`);
    }

    const [yearText, monthText, dayText] = value.split("-");
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);

    const date = new Date(Date.UTC(year, month - 1, day));

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        throw new Error(`invalid date '${value}'; expected format YYYY-MM-DD`);
    }

    return date;
};

export const parseArgs = (argv: ReadonlyArray<string>): Args => {
    if (argv.length !== 2) {
        throw new Error(USAGE);
    }

    const [laneArg, dateArg] = argv;

    return {
        lane: parseLane(laneArg),
        dayOfMonth: parseDate(dateArg).getUTCDate(),
    };
};
