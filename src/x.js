import constant from "./constant";

export function defaultX(d) {
  return d[0];
}

export default function(_) {
  return arguments.length ? (this._x = typeof _ === "function" ? _ : constant(+_), this) : this._x;
}
