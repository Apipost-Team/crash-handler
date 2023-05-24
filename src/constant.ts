type Point = {
  left?: 0 | string;
  top?: 0 | string;
  right?: 0 | string;
  bottom?: 0 | string;
};

export const MONITOR_POINTS: Point[] = [
  { left: 0, top: 0 },
  { left: '50%', top: 0 },
  { right: 0, top: 0 },
  { left: 0, top: '50%' },
  { left: '50%', top: '50%' },
  { right: 0, top: '50%' },
  { left: 0, bottom: 0 },
  { left: '50%', bottom: 0 },
  { right: 0, bottom: 0 },
];

export const ELEMENT_BASE_STYLE = {
  position: 'fixed',
  width: '20px',
  height: '20px',
  zIndex: '9999',
  backgroundColor: '#73fa73',
};

export const INIT_DELAY_SECONDS = 2000;
