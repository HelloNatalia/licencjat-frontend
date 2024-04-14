import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Tips.css";

const tipsArray = [
  {
    title: "Kupuj mądrze",
    photo: "1.jpg",
    text: "Często zdarza się, że konsumenci kupują więcej jedzenia, niż są w stanie zjeść, co prowadzi do marnowania żywności. Aby uniknąć nadmiernych zakupów, ważne jest rozważne planowanie. Przydatne jest sporządzenie listy zakupów z uwzględnieniem już posiadanych produktów, aby uniknąć niepotrzebnych powtórek, oraz stworzenie planu żywieniowego i spożycie posiłku przed wyjściem na zakupy. Używanie listy zakupów pomaga uniknąć pokus związanych z różnymi strategiami marketingowymi stosowanymi przez sprzedawców.",
  },
  {
    title: "Gotuj mądrzej",
    photo: "2.jpg",
    text: "Wyrażenie to oznacza, że należy przygotowywać takie ilości jedzenia, które rzeczywiście jest się w stanie zjeść. Wszelkie pozostałości jedzenia należy odpowiednio przechowywać, aby móc je spożyć w późniejszym czasie.",
  },
  {
    title: "Czy twoja lodówka działa poprawnie? ",
    photo: "3.jpg",
    text: "Należy upewnić się czy lodówka, którą posiadamy działa prawidłowo. Jeżeli jest ustawiona na nieodpowiednią temperaturę lub nie działa prawidłowo, może przyśpieszyć psucie się żywności.",
  },
  {
    title: "Praktykuj metodę FIFO",
    photo: "4.jpg",
    text: "Po zrobieniu zakupów, nowo zakupione produkty są świeższe i wytrzymają dłużej niż te, które już w lodówce się znajdują. Z tego powodu należy najpierw wykorzystać jedzenie, które w lodówce znalazło się w pierwszej kolejności, bądź te, którego termin ważności mija szybciej.",
  },
  {
    title: "Zrozum sposób przechowywania żywności",
    photo: "5.jpg",
    text: "Aby utrzymać jakość żywności i zminimalizować marnowanie, ważne jest odpowiednie jej przechowywanie. Wskazówki dotyczące przechowywania żywności: <ul><li>Suche produkty, np. ryż, powinny być przechowywane w szczelnych pojemnikach w temperaturze pokojowej.</li><li>Chleb powinien być przechowywany w szczelnym opakowaniu w szafce, cebula i ziemniaki w worku z siatki w chłodnym, ciemnym miejscu.</li><li>Żywność łatwo psująca się, np. mięso, powinna być przechowywana w częściach chłodzących lub zamrażalniku lodówki, a produkty mleczne, np. mleko i jogurt, w części chłodzącej lodówki.</li><li>Świeże warzywa powinny być przechowywane w szufladzie na warzywa w części chłodzącej lodówki.</li><li>Mleko i sosy powinny być przechowywane na drzwiach lodówki, a surowe mięso na dnie głównej komory przeznaczonej do tego celu.</li><li>Otwarte wcześniej opakowania produktów powinny być zamknięte i szczelnie zapakowane, aby utrzymać ich świeżość.</li><li>Należy uważać, aby nie przekraczać maksymalnego obciążenia lodówki.</li><li>Mrożone owoce, warzywa i lody powinny być odpowiednio zapakowane i przechowywane w zamrażarce. Jeśli zamrażasz żywność, zapisz datę umieszczenia jej w zamrażarce na zewnątrz opakowania. Warto zastosować zasadę FIFO.</li></ul>",
  },
  {
    title: "Czy w pełni rozumiesz etykiety na opakowaniach?",
    photo: "6.jpg",
    text: "Etykiety jakie możemy spotkać na opakowaniach to: „Należy spożyć do” oraz „Najlepiej spożyć przed”, ich różnica została opisana w rozdziale o przyczynach marnowania żywności w tej pracy. ",
  },
  {
    title: "Poproś o mniejsze porcje ",
    photo: "7.jpg",
    text: "Jeżeli w restauracji, bufecie, czy miejscach tego typu konsument uważa, że nie uda mu się zjeść całej porcji, powinien poprosić o nałożenie mniejszej ilości jedzenia.",
  },
  {
    title: "Pokochaj swoje resztki ",
    photo: "8.jpg",
    text: "Jedząc w domu lub na mieście, jeżeli zostaną resztki, których nie udało się zjeść, nie należy ich wyrzucać. Powinno się poprosić w restauracji o zapakowanie pozostałego jedzenia aby dokończyć je później. Można również stworzyć z niego nowe danie.",
  },
  {
    title: "Bądź kreatywny ",
    photo: "9.jpg",
    text: "Istnieje dużo sposobów aby zużyć jedzenie, które zazwyczaj się marnuje. Przykładowo mając owoce, które zaczęły tracić swój atrakcyjny wygląd, możemy zrobić z nich smoothie bądź dżem.",
  },
  {
    title: "Dziel się jedzeniem: użyj przeznaczonych do tego celu aplikacji ",
    photo: "10.jpg",
    text: "Na rynku istnieją aplikacje, które zapobiegają marnowaniu żywności. Umożliwiają one przykładowo firmom spożywczym sprzedanie konsumentom jedzenia, które miałoby się zmarnować po niższej cenie.",
  },
  {
    title: "Technologia może pomóc ",
    photo: "11.jpg",
    text: "Na rynku dostępne są inteligentne produkty do przechowywania, które pomagają śledzić okres przydatności żywności. Przykładem jest platforma znakowania, która umożliwia zamocowanie etykiety do produktu spożywczego. Etykieta śledzi rodzaj żywności, datę umieszczenia w miejscu przechowywania i oferuje przepisy oparte na dostępnych składnikach.",
  },
  {
    title: "Kompostuj resztki jedzenia ",
    photo: "12.jpg",
    text: "Możliwe jest skompostowanie wszystkich nadmiarowych produktów spożywczych, które nie mogą być bezpiecznie wykorzystane ponownie, oraz innych niejadalnych resztek żywności, takich jak małe kości i skorupki jaj. Przekompostowanie tych odpadków zamiast wyrzucania ich do kosza pozwala na odzyskanie istotnych składników odżywczych i przekazanie ich z powrotem do gleby, co wpływa korzystnie na zdrowie i wzrost roślin.",
  },
];

export default function Tips() {
  const [showIndex, setShowIndex] = useState(null);

  const handleClose = () => setShowIndex(null);
  const handleShow = (index) => setShowIndex(index);

  return (
    <div className="content">
      <div className="container p-4">
        <p className="fs-4">
          Jak możemy minimalizować problem marnowania żywności?
        </p>
        <p className="">
          Poniżej znajdziesz przydatne wskazówki zaproponowane przez FAO.
        </p>
        <div className="row">
          {tipsArray.map((tip, index) => {
            return (
              <div className="col-12 col-md-4 col-lg-3 p-3" key={index}>
                <div
                  className="tip-info-box p-3"
                  onClick={() => handleShow(index)}
                  style={{
                    backgroundImage: `url(/tips-img/${tip.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative", // Dodanie pozycji względnej
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(70, 70, 70, 0.6)", // Przyciemnienie tła
                    }}
                  ></div>
                  <p
                    className="fs-5 m-0"
                    style={{ color: "white", position: "relative", zIndex: 1 }}
                  >
                    {tip.title}
                  </p>
                </div>

                <Modal show={showIndex === index} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{tip.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img src={`/tips-img/${tip.photo}`} className="tip-img" />
                    <div className="row">
                      <div className="">
                        <p
                          className="fs-5 mt-3"
                          dangerouslySetInnerHTML={{ __html: tip.text }}
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Zamknij
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
