/// <reference lib="webworker" />
import { DEFAULT_INTERVAL_MS, DEFAULT_ROW_LENGTH } from 'src/global/constants';
import { IMessageParams, IGridRow } from './app.model';

let intervalID: ReturnType<typeof setInterval>;

addEventListener('message', ({ data }: { data: IMessageParams }) => {

  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(
    () => postMessage(generateRowList(data.size ?? DEFAULT_ROW_LENGTH)),
    data.ms ?? DEFAULT_INTERVAL_MS
  );
});

function generateRowList(length: number): IGridRow[] {
  const colors = [
    'red',
    'black',
    'blue',
    'green',
    'yellow',
    'orange',
    'brown',
    'purple',
    'pink',
    'grey',
  ];
  return Array.from({ length }, (_, index) => {
    const id = index + 1;
    return new Object({
      id: String(id),
      int: Math.round(Math.random() * Number(id)),
      float: Math.random() * Number(id),
      color: colors[Math.floor(Math.random() * colors.length)],
      child: {
        id: String(length + id),
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    });
  }) as IGridRow[];
}
