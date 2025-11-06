function WeatherCard () {

    return(
    <>
        <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">Current Weather</h5>
                <p className="card-text">Text Descriping The Weather</p>
                <a href="#" className="btn btn-primary"> View Weather History </a>
            </div>
        </div>
    </>
    );
}

export default WeatherCard;