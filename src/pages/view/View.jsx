import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveItem } from "../../redux/user/userSlice";
import Navbar from "../../components/Navbar/Navbar";

const View = () => {
  const { id } = useParams();
  const { properties } = useSelector((state) => state.property);
  const { saved } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // some api call
  const getProductById = (productId) => {
    const product = properties.find((item) => item.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  };

  const product = getProductById(id);
  const isProductSaved = saved?.includes(id);

  const handleSaveItem = (productId) => {
    if (!productId) return;
    if (isProductSaved) {
      alert("Property already saved");
      return;
    }
    dispatch(saveItem(productId));
    alert("product saved successfully");
  };

  return (
    <>
      <Navbar />
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl lg:max-w-6xl mx-auto">
            <div className="flex flex-wrap -mx-4 mb-12">
              <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                <div className="">
                  <div className="h-full w-full transform -translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
                    <img
                      className="w-full h-full object-cover rounded-md border-2 border-black"
                      src={product?.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="max-w-lg">
                  <h2 className="text-4xl font-black mb-2">
                    {product?.address}
                  </h2>
                  <span className="block text-sm font-bold mb-3">
                    Type: {product?.type}
                  </span>

                  <span className="block text-2xl font-black text-green-500 mb-4">
                    $ {product?.price.toLocaleString()}
                  </span>
                  <p className="font-bold mb-2">Property Details:</p>
                  <ul className="list-disc list-inside font-medium mb-6">
                    <li>Floorspace: {product?.floorspace}</li>
                    <li>No. of Beds: {product?.beds}</li>
                    <li>Baths: {product?.baths}</li>
                    <li>Parking: {product?.parking}</li>
                    <li>Construction: {product?.construction.join(", ")}</li>
                  </ul>
                  <p className="font-bold mb-2">Broker Details:</p>
                  <ul className="list-disc list-inside font-medium mb-6">
                    <li>Name: {product?.broker?.name}</li>
                    <li>Email: {product?.broker?.email}</li>
                  </ul>
                  <div className="flex">
                    <div className="w-full h-12">
                      <a
                        href={`mailto:${product?.broker?.email}`}
                        className="w-full h-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex justify-center items-center gap-2"
                      >
                        Contact Broker
                      </a>
                    </div>
                    <div className="w-auto px-2 mb-4">
                      <span
                        className={`${
                          isProductSaved
                            ? "text-rose-500 border-rose-500"
                            : "text-black border-black"
                        } inline-flex items-center justify-center w-12 h-12 hover:text-indigo-500 border-2 hover:border-indigo-500 rounded-md transition duration-200`}
                        onClick={() => handleSaveItem(product?.id)}
                      >
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.44 0.0999756C12.63 0.0999756 11.01 0.979976 10 2.32998C8.99 0.979976 7.37 0.0999756 5.56 0.0999756C2.49 0.0999756 0 2.59998 0 5.68998C0 6.87998 0.19 7.97998 0.52 8.99998C2.1 14 6.97 16.99 9.38 17.81C9.72 17.93 10.28 17.93 10.62 17.81C13.03 16.99 17.9 14 19.48 8.99998C19.81 7.97998 20 6.87998 20 5.68998C20 2.59998 17.51 0.0999756 14.44 0.0999756Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default View;
