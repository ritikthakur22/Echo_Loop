export const formatDelay = (milliseconds: number) => milliseconds >= 1000 ? `${(milliseconds / 1000).toFixed(milliseconds % 1000 ? 1 : 0)} s` : `${milliseconds} ms`;
