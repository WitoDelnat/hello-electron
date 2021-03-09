import { fluse } from "fluse";
import slonikPlugin from "fluse-plugin-slonik";

export const { fixture, scenario } = fluse({
  plugins: {
    slonik: slonikPlugin(),
  },
});
