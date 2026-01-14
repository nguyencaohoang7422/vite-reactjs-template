import LoadingFullPage from "@/shared/components/loading/loading-full";
import { Profiler, Suspense } from "react";
import { AppRouter } from "./router";
function onRender(_id: any, phase: any, actualDuration: any, baseDuration: any, startTime: any, commitTime: any) {
    const render = {
        id: _id,
        phase: phase,
        actualDuration: actualDuration,
        baseDuration: baseDuration,
        startTime : startTime,
        commitTime : commitTime
    }
  console.log("🚀 ~ onRender ~ phase:", render)
}
function App() {
  return (
    <Suspense fallback={<LoadingFullPage/>}>  
      <Profiler id="App" onRender={onRender}>
        <AppRouter />
      </Profiler>
    </Suspense>
    );
}

export default App;
