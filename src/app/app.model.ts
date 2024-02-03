export class GridRow implements IGridRow {
  private _id: string;
  private _int: number;
  private _float: number;
  private _color: string;
  private _child: {
    id: string;
    color: string;
  };

  constructor(row: IGridRow) {
    this._id = row.id;
    this._int = row.int;
    this._float = row.float;
    this._color = row.color;
    this._child = row.child;
  }

  get id(): string {
    return this._id;
  }

  get int(): number {
    return this._int;
  }

  get float(): number {
    return this._float;
  }

  get color(): string {
    return this._color;
  }

  get child(): { id: string; color: string } {
    return this._child;
  }

  set id(id: string) {
    this._id = id;
  }
}

export interface IGridRow {
  id: string;
  int: number;
  float: number;
  color: string;
  child: {
    id: string;
    color: string;
  };
}

export interface IMessageParams {
  ms: number;
  size: number;
}
