import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PropertyCard = ({ id, image, city, address, type, price }) => {
  return (
    <div className="flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-1/3 bg-cover" src={image} />
      <div className="w-2/3 p-4">
        <h1 className="text-gray-900 font-bold text-2xl">{city}</h1>
        <p className="mt-2 text-gray-600 text-sm">{address}</p>
        <p className="mt-2 text-gray-600 text-sm">Type: {type}</p>

        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">
            ${price.toLocaleString()}
          </h1>
          <Link
            to={`/view/${id}`}
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

PropertyCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
