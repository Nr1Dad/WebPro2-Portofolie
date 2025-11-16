
function WeatherCard () {

    return(
    <>
        <div className="card">
            <img src="Icons\sun.png" className="card-img-top" style={{width: "100px", height: "100px"}}></img>
            <div className="card-body">
                <h5 className="card-title"> type of weather </h5>
                <p className="card-text"> Timestamp </p>
                <p className="card-text"> Temperatur </p>
                <a href="#" className="btn btn-primary"> View Weather History </a>
            </div>
        </div>
    </>
    );
}

export default WeatherCard;