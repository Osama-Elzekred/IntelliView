export default function Loading(){
    return(
        <>
        <div id="overlayer" />
            <div className="loader">
                <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
        
    )
}