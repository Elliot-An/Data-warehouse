import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import SubmitButton from "../SubmitButton";
import { transformCityName, transformCustomer, transformStore } from "@/helpers/format";
import { useReducer } from "react";
import { Button } from "../ui/button";

function checkboxReducer(state, action) {
  switch (action.type) {
    case "TOOGLE_CHECKBOX":
      return {
        ...state,
        [action.id]: action.checked
      }
    case "CLEAR_CHECKBOX":
      return {}
    default:
      return state
  }
}

function GlobalOptions({ data, activeKey, setActiveKey, setKeyDice }) {
  if (!data) {
    return (<></>)
  }

  const [checkboxState, dispatch] = useReducer(checkboxReducer, {});

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeKey === "product") {
      setKeyDice(Object.keys(checkboxState).filter(key => checkboxState[key] === true))
    } else {
      setKeyDice({
        type: transformCustomer(transformStore(activeKey)),
        arr: Object.keys(checkboxState).filter(key => checkboxState[key] === true)
      })
    }
  }

  const handleClear = () => {
    dispatch({ type: "CLEAR_CHECKBOX" })
    setKeyDice(null)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 bg-gray-100 rounded-md w-fit p-1">
        {data.hierarchy?.map((key) => {
          return (
            <button
              key={key}
              data-active={activeKey === key}
              disabled={activeKey === key}
              className="flex-col justify-center rounded-md w-[90px] py-1 text-gray-600 text-center 
                data-[active=true]:bg-[var(--color-main-blue)] data-[active=true]:text-white"
              onClick={() => {
                setActiveKey(key)
                setKeyDice(null)
              }}
            >
              <span className="text-base font-medium leading-none capitalize">{key}</span>
            </button>
          )
        })}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 py-2 text-left">
            <span className="text-base font-medium leading-none">Select {activeKey}</span>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 items-start pr-3 mb-5 max-h-[200px] overflow-y-auto">
              {data.values?.map((item, index) => {
                return (
                  <label
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <Checkbox
                      name={activeKey}
                      value={item}
                      checked={checkboxState[item] || false}
                      onCheckedChange={(checked) => {
                        dispatch({
                          type: "TOOGLE_CHECKBOX",
                          id: item,
                          checked
                        })
                      }}
                    />
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">{activeKey === "city" ? transformCityName(item) : item}</span>
                  </label>
                )
              })}
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleClear()}
              >
                Clear
              </Button>
              <SubmitButton />
            </div>
          </form>
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  )
}

export default GlobalOptions;