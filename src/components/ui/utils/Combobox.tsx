import { forwardRef, useRef, useState } from "react"
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
    FloatingPortal
} from "@floating-ui/react"

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
                className={`${active ? 'bg-blue-4/50' : 'bg-none'} rounded-md p-2`}
                {...rest}
                style={{
                    cursor: "pointer",
                    ...rest.style
                }}
            >
                {children}
            </div>
        )
    }
)

interface ComboboxProps<T> {
    items: T[]
    value: T | null
    onChange: (item: T) => void
    getItemLabel?: (item: T) => string
    label: string
}

const Combobox = <T,>({
    items,
    value,
    onChange,
    label,
    getItemLabel = (item) => String(item)
}: ComboboxProps<T>) => {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
                        maxHeight: `${availableHeight}px`
                    })
                },
                padding: 10
            })
        ]
    })

    const role = useRole(context, { role: "listbox" })
    const dismiss = useDismiss(context)
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: true
    })

    const {
        getReferenceProps,
        getFloatingProps,
        getItemProps
    } = useInteractions([role, dismiss, listNav])

    const filteredItems = items.filter((item) => {
        const label = getItemLabel(item);
        return value && typeof value === 'string' && label.toLowerCase().startsWith(value.toLowerCase())
    })

    return (
        <label htmlFor={label} className="flex flex-col gap-1">
            <span className="text-blue-1 font-medium">{label}</span>
            <input
                className="bg-blue-5/70 focus:outline focus:outline-1 outline-blue-5 rounded w-full text-[100%] text-blue-2 px-2 py-3"
                id={label}
                name={label}
                {...getReferenceProps({
                    ref: refs.setReference,
                    onChange: (event) => {
                        const inputValue = (event.target as HTMLInputElement).value
                        setOpen(inputValue !== "")
                        setActiveIndex(0)
                    },
                    value: value ? getItemLabel(value) : "",
                    "aria-autocomplete": "list",
                    onKeyDown(event) {
                        if (
                            event.key === "Enter" &&
                            activeIndex != null &&
                            filteredItems[activeIndex]
                        ) {
                            onChange(filteredItems[activeIndex])
                            setActiveIndex(null)
                            setOpen(false)
                        }
                    }
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
                            className="bg-blue-5/70 rounded-md p-2 text-blue-1 mt-2 gap-2"
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    ...floatingStyles
                                }
                            })}
                        >
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <Item
                                        {...getItemProps({
                                            key: getItemLabel(item),
                                            ref(node) {
                                                listRef.current[index] = node
                                            },
                                            onClick() {
                                                onChange(item)
                                                setOpen(false)
                                                refs.domReference.current?.focus()
                                            }
                                        })}
                                        active={activeIndex === index}
                                    >
                                        {getItemLabel(item)}
                                    </Item>
                                ))
                            ) : (
                                <div className="w-full">
                                    {label} não encontradas
                                </div>
                            )}
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </label>
    )
}

export default Combobox
