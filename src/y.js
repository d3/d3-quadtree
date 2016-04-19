import constant from "./constant";

export function defaultY(d) {
  return d[1];
}

export default function(_) {
  return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(+_), this) : this._y;
}
