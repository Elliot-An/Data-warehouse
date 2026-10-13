import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";

function TimeOptions({ activeKey, setActiveKey, setTimeDice }) {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  let placeholder = "";
  if (activeKey === "day") {
    placeholder = "e.g: 01-02-2024";
  } else if (activeKey === "month") {
    placeholder = "e.g: 02-2024";
  } else if (activeKey === "year") {
    placeholder = "e.g: 2024";
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeDice({
      start: startValue,
      end: endValue
    })
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 bg-gray-100 rounded-md w-fit p-1">
        {["day", "month", "year"].map((key) => {
          return (
            <button
              key={key}
              data-active={activeKey === key}
              disabled={activeKey === key}
              className="flex-col justify-center rounded-md w-[90px] py-1
                text-gray-600 text-center data-[active=true]:bg-[var(--color-main-blue)] data-[active=true]:text-white"
              onClick={() => {
                setActiveKey(key)
                setTimeDice(null)
                setStartValue(null)
                setEndValue(null)
              }}
            >
              <span className="text-base font-medium leading-none capitalize">{key}</span>
            </button>
          )
        })}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 text-left">
            <span className="text-base font-medium leading-none">Select {activeKey}</span>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <form 
            className="flex flex-col items-center p-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-start mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start {activeKey}</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  name="start"
                  type="text"
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={placeholder}
                />
              </div>
              <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End {activeKey}</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  name="end"
                  type="text"
                  value={endValue}
                  onChange={(e) => setEndValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={placeholder}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline" 
                size="lg"
                onClick={() => {
                  setStartValue(null)
                  setEndValue(null)
                  setTimeDice(null)
                }}
              >Clear</Button>
              <SubmitButton />
            </div>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default memo(TimeOptions);