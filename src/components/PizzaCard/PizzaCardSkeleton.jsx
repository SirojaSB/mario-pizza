import React from "react"
import ContentLoader from "react-content-loader"

const PizzaCardSkeleton = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="135" cy="125" r="125" />
        <rect x="0" y="304" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="267" rx="10" ry="10" width="280" height="19" />
        <rect x="0" y="423" rx="10" ry="10" width="90" height="27" />
        <rect x="126" y="415" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
)

export default PizzaCardSkeleton

