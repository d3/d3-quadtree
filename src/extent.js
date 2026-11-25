export default function(_) {
  if (!arguments.length) return isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
  const x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1];
  // Setting the extent to the current extent must be a no-op.
  if (x0 === this._x0 && y0 === this._y0 && x1 === this._x1 && y1 === this._y1) return this;
  return this.cover(x0, y0).cover(x1, y1);
}
