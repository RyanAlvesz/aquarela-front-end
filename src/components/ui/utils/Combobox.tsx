import { forwardRef, useRef, useState } from "react";
import {
    autoUpdate,
    size,
    flip,
    useId,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    FloatingFocusManager,
    FloatingPortal,
} from "@floating-ui/react";

interface ItemProps {
    children: React.ReactNode
    active: boolean
}

const Item = forwardRef<HTMLDivElement, ItemProps & React.HTMLProps<HTMLDivElement>>(
    ({ children, active, ...rest }, ref) => {
        const id = useId()
        return (
            <div
                ref={ref}
                role="option"
                id={id}
                aria-selected={active}
                className={`${active ? "bg-blue-4/50" : ""} rounded-md p-2`}
                {...rest}
                style={{
                    cursor: "pointer",
                    ...rest.style,
                }}
            >
                {children}
            </div>
        )
    }
)

Item.displayName = "Item"

interface ComboboxProps<T> {
    items: T[]
    strAtr: keyof T
    selectItem: (item: T) => void
    noItemsLabel: string
    label: string
    className?: string
}

const Combobox = <T,>({
    items,
    strAtr,
    selectItem,
    noItemsLabel,
    label,
    className = ''
}: ComboboxProps<T>) => {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [inputValue, setInputValue] = useState<string>("")

    const listRef = useRef<Array<HTMLElement | null>>([])

    const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
        whileElementsMounted: autoUpdate,
        open,
        onOpenChange: setOpen,
        middleware: [
            flip({ padding: 10 }),
            size({
                apply({ rects, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                        maxHeight: `${availableHeight}px`,
                    })
                },
                padding: 10,
            }),
        ],
    })

    const role = useRole(context, { role: "listbox" })
    const dismiss = useDismiss(context)
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: true,
    })

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        role,
        dismiss,
        listNav,
    ])

    
    const sortedItems = items.sort((a, b) =>
        String(a[strAtr]).localeCompare(String(b[strAtr]), 'pt-BR')
    )

    const filteredItems = sortedItems.filter((item) =>
        String(item[strAtr]).toLowerCase().includes(inputValue.toLowerCase())
    )

    const limitedItems = filteredItems.slice(0, 5)

    return (
        <label className={`flex flex-col gap-1 ${className}`}>
            {label && <span className="text-blue-1 font-medium">{label}</span>}
            <input
                className="bg-blue-5/70 focus:outline focus:outline-1 outline-blue-5 rounded w-full h-12 text-[100%] text-blue-2 px-2 py-3"
                {...getReferenceProps({
                    ref: refs.setReference,
                    onChange: (event) => {
                        const value = (event.target as HTMLInputElement).value
                        setInputValue(value)
                        setOpen(value !== "")
                        setActiveIndex(0)
                    },
                    value: inputValue,
                    "aria-autocomplete": "list",
                    onKeyDown(event) {
                        if (event.key === "Enter") {
                            event.preventDefault()
                            if (activeIndex !== null && limitedItems[activeIndex]) {
                                selectItem(limitedItems[activeIndex])
                                setInputValue("")
                                setOpen(false)
                                refs.domReference.current?.focus()
                            }
                        }
                    },
                })}
            />
            <FloatingPortal>
                {open && (
                    <FloatingFocusManager
                        context={context}
                        initialFocus={-1}
                        visuallyHiddenDismiss
                    >
                        <div
                            className="bg-blue-5 rounded-md p-2 text-blue-1 mt-2 gap-2"
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    ...floatingStyles,
                                },
                            })}
                        >
                            {limitedItems.length > 0 ? (
                                limitedItems.map((item, index) => (
                                    <Item
                                        key={`${String(item[strAtr])}-${index}`}
                                        {...getItemProps({
                                            ref(node) {
                                                listRef.current[index] = node
                                            },
                                            onClick() {
                                                selectItem(item)
                                                setInputValue("")
                                                setOpen(false)
                                                refs.domReference.current?.focus()
                                            },
                                        })}
                                        active={activeIndex === index}
                                    >
                                        {String(item[strAtr])}
                                    </Item>
                                ))
                            ) : (
                                <div className="w-full text-center">{noItemsLabel}</div>
                            )}
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </label>
    )
}

export default Combobox

