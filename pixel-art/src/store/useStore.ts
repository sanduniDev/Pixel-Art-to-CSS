import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CellData {
    id: string;
    drawingTool: string;
    color: string;
    paletteColor: string;
    columns: number;
    rows: number;
  }
  
  interface MoveDiff {
    xDiff: number;
    yDiff: number;
    cellWidth: number;
  }
  
  interface Frame {
    id?: number;
  }
  
  interface StoreState {
    frames: Frame[];
    paletteGridData: any[];
    cellSize: number;
    columns: number;
    rows: number;
    hoveredIndex?: number;
    spinnerVisible: boolean;
    notificationMessage: string;
    past: StoreState[];
    future: StoreState[];
    setInitialState: (options: Partial<StoreState>) => void;
    changeDimensions: (property: string, increment: number) => void;
    updateGridBoundaries: (gridElement: any) => void;
    selectPaletteColor: (position: number) => void;
    setCustomColor: (customColor: string) => void;
    cellAction: (cellData: CellData) => void;
    moveDrawing: (moveDiff: MoveDiff) => void;
    setDrawing: (drawingData: Partial<StoreState>) => void;
    endDrag: () => void;
    switchTool: (tool: string) => void;
    setCellSize: (cellSize: number) => void;
    resetGrid: () => void;
    showSpinner: () => void;
    hideSpinner: () => void;
    sendNotification: (message: string) => void;
    changeActiveFrame: (frameIndex: number) => void;
    reorderFrame: (selectedIndex: number, destinationIndex: number) => void;
    createNewFrame: () => void;
    deleteFrame: (frameId: number) => void;
    duplicateFrame: (frameId: number) => void;
    setDuration: (duration: number) => void;
    changeFrameInterval: (frameIndex: number, interval: number) => void;
    newProject: () => void;
    changeHoveredCell: (cell: any) => void;
    undo: () => void;
    redo: () => void;
  }
  

const useStore = create<StoreState>(devtools((set, get) => ({
  frames: [],
  paletteGridData: [],
  cellSize: 0,
  columns: 0,
  rows: 0,
  hoveredIndex: undefined,
  spinnerVisible: false,
  notificationMessage: '',
  past: [],
  future: [],
  
  setInitialState: (options) => set(() => ({ ...get(), ...options })),

  changeDimensions: (property, increment) => set((state) => {
    const newState = { ...state, [property]: state[property] + increment };
    return newState;
  }),

  updateGridBoundaries: (gridElement) => set(() => ({ gridElement })),

  selectPaletteColor: (position) => set(() => ({ selectedPalettePosition: position })),

  setCustomColor: (customColor) => set(() => ({ customColor })),

  cellAction: ({ id, drawingTool, color, paletteColor, columns, rows }) =>
    set(() => ({ frames: [...get().frames, { id, drawingTool, color, paletteColor, columns, rows }] })),

  moveDrawing: ({ xDiff, yDiff, cellWidth }) => set(() => ({ moveDiff: { xDiff, yDiff, cellWidth } })),

  setDrawing: (drawingData) => set(() => ({ ...get(), ...drawingData })),

  endDrag: () => set(() => ({ isDragging: false })),

  switchTool: (tool) => set(() => ({ currentTool: tool })),

  setCellSize: (cellSize) => set(() => ({ cellSize })),

  resetGrid: () => set(() => ({ frames: [], paletteGridData: [] })),

  showSpinner: () => set(() => ({ spinnerVisible: true })),

  hideSpinner: () => set(() => ({ spinnerVisible: false })),

  sendNotification: (message) => set(() => ({ notificationMessage: message })),

  changeActiveFrame: (frameIndex) => set(() => ({ activeFrameIndex: frameIndex })),

  reorderFrame: (selectedIndex, destinationIndex) => set((state) => {
    const frames = [...state.frames];
    [frames[selectedIndex], frames[destinationIndex]] = [frames[destinationIndex], frames[selectedIndex]];
    return { frames };
  }),

  createNewFrame: () => set((state) => ({ frames: [...state.frames, {}] })),

  deleteFrame: (frameId) => set((state) => ({ frames: state.frames.filter((frame) => frame.id !== frameId) })),

  duplicateFrame: (frameId) => set((state) => ({ frames: [...state.frames, { ...state.frames.find((frame) => frame.id === frameId) }] })),

  setDuration: (duration) => set(() => ({ duration })),

  changeFrameInterval: (frameIndex, interval) => set(() => {
    const frames = [...get().frames];
    frames[frameIndex].interval = interval;
    return { frames };
  }),

  newProject: () => set({
    frames: [],
    paletteGridData: [],
    cellSize: 0,
    columns: 0,
    rows: 0,
    hoveredIndex: undefined,
    spinnerVisible: false,
    notificationMessage: '',
    past: [],
    future: []
  }),

  undo: () => {
    const { past, ...current } = get();
    if (past.length > 0) {
      const previous = past[past.length - 1];
      set({
        ...previous,
        past: past.slice(0, past.length - 1),
        future: [current, ...get().future]
      });
    }
  },

  redo: () => {
    const { future } = get();
    if (future.length > 0) {
      const next = future[0];
      set({
        ...next,
        past: [...get().past, get()],
        future: future.slice(1)
      });
    }
  },
})));
