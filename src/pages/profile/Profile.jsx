import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProperties } from "../../redux/property/propertyActions";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading } = useSelector((state) => state.property);
  const { isLoggedIn, user, saved } = useSelector((state) => state.user);

  console.log(saved);

  // some api call
  const getProductById = (productId) => {
    const product = properties.find((item) => item.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  };

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

      <section className="flex flex-col gap-4 justify-center items-center my-6">
        <div className="bg-white overflow-hidden shadow rounded-lg border max-w-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This is some information about the user.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <span className="text-sm font-medium text-gray-500">
                Full name:{" "}
              </span>
              <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {user.email.split("@")[0]}
              </span>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <span className="text-sm font-medium text-gray-500">
                Email address:{" "}
              </span>
              <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full min-h-screen">
          <h2 className="my-6 text-center text-3xl font-semibold">
            Saved Properties
          </h2>

          {loading ? (
            <p className="text-center ">Loading...</p>
          ) : (
            <>
              {saved && saved?.length !== 0 ? (
                <div className="py-6 flex gap-4 flex-wrap justify-center">
                  {saved.map((item) => {
                    const property = getProductById(item);
                    return (
                      <PropertyCard
                        key={property.id}
                        {...property}
                        showRemove={true}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-center ">No results found</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
