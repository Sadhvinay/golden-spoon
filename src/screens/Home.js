import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }
  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>

      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "3" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 " type="search" placeholder="Type in..." aria-label="Search" 
                    value ={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn text-white btn-outline-success bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active" >
              <img src={require("../images/image1.jpg")} className="d-block w-100  " style={{ filter: "brightness(30%)", width: "900px", height: "700px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../images/image2.jpg")} className="d-block w-100 " style={{ filter: "brightness(30%)", width: "900px", height: "700px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../images/image3.jpg")} className="d-block w-100 " style={{ filter: "brightness(30%)", width: "900px", height: "700px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../images/image6.avif")} className="d-block w-100 " style={{ filter: "brightness(30%)", width: "900px", height: "700px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../images/image5.avif")} className="d-block w-100 " style={{ filter: "brightness(30%)", width: "900px", height: "700px" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (<div className='row mb-3 g-2'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                {foodItem != [] ? foodItem.filter(
                  (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                        {/* {console.log(filterItems.url)} */}
                        <Card foodItem={filterItems}
                          options={filterItems.options[0]}
                            ></Card>
                      </div>
                    )
                  }) : <div> No Such Data Found</div>}
              </div>
              )
            })
            : ""
        }
      </div>

      <div><Footer /></div>

    </div>
  )
}
