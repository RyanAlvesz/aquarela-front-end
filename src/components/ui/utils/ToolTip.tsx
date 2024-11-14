import { flip, shift, computePosition, arrow, offset, Placement } from "@floating-ui/react";
import React, { useEffect, useRef, useState } from "react";

interface ToolTipProps {
    children: React.ReactNode
    message: string
    placement?: Placement 
}

const ToolTip: React.FC<ToolTipProps> = ({children, message, placement = 'bottom'}) => {
    
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
    const [arrowPosition, setArrowPosition] = useState<{ [key: string]: string | undefined }>({});
    const [staticSide, setStaticSide] = useState<string | undefined>('')
    const [isVisible, setIsVisible] = useState(false)

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    useEffect(() => {
        if (isVisible && childrenRef.current && tooltipRef.current) {
            computePosition(childrenRef.current, tooltipRef.current,{
                placement: placement,
                middleware: [
                    offset(6),
                    flip({padding: 6}),
                    shift({padding: 6}),
                    arrow({element: arrowRef})
                ]
            }).then(({ x, y, placement, middlewareData }) => {

                setPosition({ top: y ?? 0, left: x ?? 0 })
                const arrowX = middlewareData.arrow?.x ?? 0
                const arrowY = middlewareData.arrow?.y ?? 0
                
                setStaticSide({
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]])

                setArrowPosition({
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: ''
                })
                
            })
        }
    }, [isVisible, placement, staticSide])

    const childrenRef = useRef(null)
    const tooltipRef = useRef(null)
    const arrowRef = useRef(null)
    
    return(

        <div
            className="relative h-fit flex items-center justify-center"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div ref={childrenRef} className="flex items-center justify-center w-fit h-fit">
                {children}
            </div>
            {isVisible && (
                <div 
                    ref={tooltipRef} 
                    className="animate-fade-down animate-duration-1000 animate-ease-in-out select-none bg-blue-1 text-white font-medium py-1 px-2 rounded-md text-[90%] w-max absolute top-0 left-0"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                    }}
                >
                    {message}
                    <div
                        ref={arrowRef}
                        style={{
                            left: arrowPosition.left,
                            top: arrowPosition.top,
                            [staticSide as string]: '-4px'
                        }}
                        className="absolute bg-blue-1 h-2 w-2 rotate-45"
                    />
                </div>
            )}
        </div>
    )
}

export default ToolTip;