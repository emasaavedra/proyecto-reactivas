import type { Tournament } from "../types/Tournament";

const Torneo = (torneo: Tournament) => (
    <div>
        {torneo.tournament}
        {torneo.Year}
    </div>
);

export default Torneo;