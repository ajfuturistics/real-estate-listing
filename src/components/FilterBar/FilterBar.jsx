import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { filter } from "../../redux/property/propertySlice";

const FilterBar = () => {
  const { properties } = useSelector((state) => state.property);
  const [search, setSearch] = useSearchParams();
  const [location, setLocation] = useState(search.get("location") || "");
  const [type, setType] = useState(search.get("type") || "");
  const [price, setPrice] = useState(search.get("price") || "");

  const dispatch = useDispatch();

  let uniqueItems = [...new Set(properties.map((property) => property.city))];
  let uniqueTypes = [...new Set(properties.map((property) => property.type))];

  const filterProperty = () => {
    let obj = {};
    let filteredArr = properties.length !== 0 ? properties : [];
    if (location !== "") {
      obj.location = location;
      filteredArr = filteredArr.filter((item) => item.city === location);
    }
    if (type !== "") {
      obj.type = type;
      filteredArr = filteredArr.filter((item) => item.type === type);
    }
    if (price !== "") {
      obj.price = price;
      filteredArr =
        filteredArr.filter((item) => item.price <= Number(price)) || [];
    }

    dispatch(filter(filteredArr));
    setSearch(obj);
  };

  useEffect(() => {
    filterProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  return (
    <div className="flex gap-2 justify-center flex-wrap p-2 md:p-4">
      <div>
        <select
          name="location"
          id="location"
          className="p-2 rounded-xl border border-gray-400 outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All</option>
          {uniqueItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="price"
          id="price"
          className="p-2 rounded-xl border border-gray-400 outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">All</option>
          <option value="100000">Under 1 Lac</option>
          <option value="200000">Under 2 Lac</option>
          <option value="300000">Under 3 Lac</option>
          <option value="400000">Under 4 Lac</option>
          <option value="500000">Under 5 Lac</option>
          <option value="600000">Under 6 Lac</option>
          <option value="700000">Under 7 Lac</option>
          <option value="800000">Under 8 Lac</option>
          <option value="900000">Under 9 Lac</option>
          <option value="1000000">Under 10 Lac</option>
        </select>
      </div>
      <div>
        <select
          name="types"
          id="types"
          className="p-2 rounded-xl border border-gray-400 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          {uniqueTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          onClick={filterProperty}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
        >
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
