import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <>
      <div className="w-full h-[300px] flex gap-2 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" color="var(--color-main-blue)" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </>
  )
}

export default Loading;