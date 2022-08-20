import { React, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geodbApiOptions } from "../../api";

function Search({onSearchChange}) {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
      return fetch (`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`, 
      geodbApiOptions)
      .then(response => response.json())
      .then(response => {
        return {
            options: response.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        }
      })
      .catch((err) => console.error(err));  
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search your city "
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />

    )
}

export default Search