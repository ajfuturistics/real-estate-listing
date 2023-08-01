import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { getProperties } from "../../redux/property/propertyActions";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";

const Property = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filteredProperties, loading } = useSelector(
    (state) => state.property
  );

  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen">
        <h2 className="my-6 text-center text-3xl font-semibold">
          Find Properties
        </h2>

        {loading ? (
          <p className="text-center ">Loading...</p>
        ) : (
          <>
            <FilterBar />
            {filteredProperties && filteredProperties.length !== 0 ? (
              filteredProperties.map((item) => (
                <p key={item.id} className="text-center ">
                  {item.address}
                </p>
              ))
            ) : (
              <p className="text-center ">No results found</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Property;
