import { parseArgs } from "./cli";
import { CONFIG } from "./cohorts";
import type { Lane, Repo } from "./domain";

const chooseRepos = (lane: Lane, dayOfMonth: number): ReadonlyArray<Repo> =>
    Array.from(
        new Set(
            CONFIG[lane].cohorts
                .filter((cohort) => cohort.days.includes(dayOfMonth))
                .flatMap((cohort) => cohort.repos),
        ),
    );

const run = (): void => {
    const args = parseArgs(process.argv.slice(2));
    const repos = chooseRepos(args.lane, args.dayOfMonth);

    if (repos.length === 0) {
        return;
    }

    console.log(repos.join("\n"));
};

const main = (): void => {
    try {
        run();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Error: ${message}`);
        process.exit(1);
    }
};

main();
