import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="content">
      <div className="container-fluid p-0 bg-white">
        <div className="img-container">
          <img
            src="foodsharing-sm.jpg"
            className="bg-image d-sm-block d-md-none"
            alt="background"
          />

          <img
            src="foodsharing-lg.jpg"
            className="bg-image d-none d-md-block"
            alt="background"
          />
        </div>
        <div class="image-text">
          <p className="title-text mb-1">Dziel się z innymi</p>
          <p className="subtitle-text d-none d-sm-block">
            Walcz z marnowaniem żywności
          </p>
          <p>
            <hr className="divider-home-page" />
          </p>
          <a href="announcements" className="text-decoration-none text-white">
            <p className="link-text">Zobacz ogłoszenia w okolicy >></p>
          </a>
        </div>

        <div className="bg-white mt-0">
          <div className="row p-4">
            <p className="fs-4 text-center">Zobacz, jakie to proste</p>
            <div className="col-12 col-lg-6 p-3">
              <img className="hp-imgs" src="home-page/hp-1.jpg" />
            </div>
            <div className="col-12 col-lg-6 p-3">
              <img className="hp-imgs" src="home-page/hp-2.jpg" />
            </div>
            <div className="col-12 col-lg-6 p-3">
              <img className="hp-imgs" src="home-page/hp-3.jpg" />
            </div>
            <div className="col-12 col-lg-6 p-3">
              <a href="create-announcement">
                <img className="hp-imgs" src="home-page/hp-4.jpg" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-hp-green p-4">
          <div className="row ">
            <div className="col">
              <p className="fs-4">Odkryj nasz generator przepisów </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <img src="home-page/hp-5.png" className="recipe-hp-img" />
            </div>
            <div className="col-12 col-md-6">
              <div className="recipe-text-hp p-3 px-4">
                <p className="fs-5">
                  Wybierasz produkty, które posiadasz w domu a my dostarczamy ci
                  przepisy!
                </p>
                <a href="recipes" className="btn btn-success">
                  Sprawdź
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="row bg-grey p-3 ps-5">
            <div className="col-6 col-md-4">
              <img src="logo.png" />
            </div>
            <div className="col-6 col-md-4">
              <p className="text-grey mb-0 mt-1">Twórca: Natalia Tucka</p>
            </div>
            <div className="col">
              <p className="text-grey mb-0 mt-1">
                Kontakt: nataliatucka01@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
