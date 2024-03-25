import { useEffect, useState } from "react";
import Select from "react-select";
import parseXML from "./XMLparse";

const SelectComponent = ({ setMapCenter, setInputCityName }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { value: "x", label: "Twoja lokalizacja" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (option) => {
    setSelectedOption(option);
    if (option.value === "x") {
      setMapCenter(null);
      setInputCityName("");
    } else {
      setMapCenter(option);
      setInputCityName(option.label);
    }
  };

  useEffect(() => {
    const loadOptions = async () => {
      if (inputValue.length >= 3) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://api.geonames.org/search?country=PL&name_startsWith=${inputValue}&username=hello_natalia`
          );

          const xmlData = await response.text();
          const jsonData = parseXML(xmlData);
          let newOptions = [{ value: "x", label: "Twoja lokalizacja" }];
          jsonData.forEach((place) => {
            newOptions.push({
              value: [place.lat, place.lng],
              label: place.name,
            });
          });
          setOptions(newOptions);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setOptions([{ value: "x", label: "Twoja lokalizacja" }]);
      }
    };
    loadOptions();
  }, [inputValue]);

  return (
    <div>
      <Select
        // styles={{
        //   control: (baseStyles, state) => ({
        //     ...baseStyles,
        //     zIndex: 1000,
        //   }),
        // }}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        onInputChange={(newValue) => setInputValue(newValue)}
        isLoading={isLoading}
        loadingMessage={() => "Wczytywanie..."}
        className="search-form select-react-container"
        placeholder="Miasto"
      />
    </div>
  );
};

export default SelectComponent;
