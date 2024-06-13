import create from 'zustand';

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
    id: number;  // Assuming id is a number based on your error message
}

interface StoreState {
    frames: Frame[];
    paletteGridData: any[]; // Define a more specific type if possible
    cellSize: number;
    columns: number;
    rows: number;
    hoveredIndex?: number;
    spinnerVisible: boolean;
    notificationMessage: string;
    past: StoreState[];
    future: StoreState[];
    gridElement?: HTMLElement; // If you use gridElement, it should be part of the state
    selectedPalettePosition?: number; // If used, it should be part of the state
    customColor?: string; // If used, it should be part of the state
    currentTool?: string; // If used, it should be part of the state
    activeFrameIndex?: number; // If used, it should be part of the state
    duration?: number; // If used, it should be part of the state
}

const useStore = create<StoreState>((set, get) => ({
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

    // State update methods with correct typings
    setInitialState: (options: Partial<StoreState>) => set((state) => ({ ...state, ...options })),
    changeDimensions: (property: keyof StoreState, increment: number) => set((state) => {
        if (typeof state[property] === 'number') {
            return { ...state, [property]: (state[property] as number) + increment, past: [...state.past] };
        }
        return state;
    }),
    updateGridBoundaries: (gridElement: HTMLElement) => set((state) => ({ ...state, gridElement, past: [...state.past] })),
    selectPaletteColor: (position: number) => set((state) => ({ ...state, selectedPalettePosition: position, past: [...state.past] })),
    setCustomColor: (customColor: string) => set((state) => ({ ...state, customColor, past: [...state.past] })),
    cellAction: (cellData: CellData) => set((state) => {
        const frame: Frame = {
            id: parseInt(cellData.id, 10), // Convert string id to number
        };
        return { frames: [...state.frames, frame], past: [...state.past] };
    }),
    moveDrawing: (moveDiff: MoveDiff) => set((state) => ({ ...state, moveDiff, past: [...state.past] })),
    setDrawing: (drawingData: Partial<StoreState>) => set((state) => ({ ...state, ...drawingData, past: [...state.past] })),
    endDrag: () => set((state) => ({ ...state, isDragging: false, past: [...state.past] })),
    switchTool: (tool: string) => set((state) => ({ ...state, currentTool: tool, past: [...state.past] })),
    setCellSize: (cellSize: number) => set((state) => ({ ...state, cellSize, past: [...state.past] })),
    resetGrid: () => set((state) => ({ frames: [], paletteGridData: [], past: [...state.past] })),
    showSpinner: () => set((state) => ({ ...state, spinnerVisible: true, past: [...state.past] })),
    hideSpinner: () => set((state) => ({ ...state, spinnerVisible: false, past: [...state.past] })),
    sendNotification: (message: string) => set((state) => ({ ...state, notificationMessage: message, past: [...state.past] })),
    changeActiveFrame: (frameIndex: number) => set((state) => ({ ...state, activeFrameIndex: frameIndex, past: [...state.past] })),
    reorderFrame: (selectedIndex: number, destinationIndex: number) => set((state) => {
        const frames = [...state.frames];
        [frames[selectedIndex], frames[destinationIndex]] = [frames[destinationIndex], frames[selectedIndex]];
        return { frames, past: [...state.past] };
    }),
    createNewFrame: () => set((state) => ({ frames: [...state.frames, { id: state.frames.length + 1 }], past: [...state.past] })),
    deleteFrame: (frameId: number) => set((state) => ({
        frames: state.frames.filter(frame => frame.id !== frameId), past: [...state.past]
    })),
    duplicateFrame: (frameId: number) => set((state) => {
        const frame = state.frames.find(frame => frame.id === frameId);
        if (frame) {
            return { frames: [...state.frames, { ...frame }], past: [...state.past] };
        }
        return state;
    }),
    setDuration: (duration: number) => set((state) => ({ ...state, duration, past: [...state.past] })),
    changeFrameInterval: (frameIndex: number, interval: number) => set((state) => {
        const frames = [...state.frames];
        if (frames[frameIndex]) {
            (frames[frameIndex] as any).interval = interval; // Use any or extend Frame interface
        }
        return { frames, past: [...state.past] };
    }),
    newProject: () => set(() => ({
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
    })),
    undo: () => {
        const { past, ...current } = get();
        if (past.length > 0) {
            const previous = past[past.length - 1];
            set({
                ...previous,
                past: past.slice(0, -1),
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
    }
})));

export default useStore;
