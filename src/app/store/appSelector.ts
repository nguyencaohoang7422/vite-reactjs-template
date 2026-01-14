import type { RootState } from "@/configs";

export const selectPath = (state: RootState) => state.app.path;