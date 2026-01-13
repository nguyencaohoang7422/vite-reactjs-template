import type { RootState } from "@/libs";

export const selectPath = (state: RootState) => state.app.path;