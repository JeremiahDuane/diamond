export const PageHeader = (properties : { length: number }) => {
    return (        
        <div className="flex w-full items-center justify-between gap-2 mb-2">
          <div>
            <p className="eyebrow">YOUR PORTFOLIO, IN ONE PLACE</p>
            <h1>Property locations</h1>
            <p className="page-description">Browse and find addresses across your property portfolio.</p>
          </div>
          <span className="location-count">{properties.length} locations</span>
        </div>
)
}