import React from 'react'

const SkeletonItem = () => {
    return (
        <div className="item flex w-full flex-col gap-4 h-80">
            <div className="skeleton h-5/6 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-28"></div>
        </div>
    )
}

export default SkeletonItem