import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCategory from "../../components/TourCategory/TourCategory";
import {
  fetchProduct,
  fetchFilterProducts,
} from "../../redux/slices/productSlice";
import Filter from "../../components/Filter/Filter";
import { tourOptions, PlaceOptions, PlaceOptions2 } from "../../data/options";
import LoadingSpinner from "../../components/Loading/Loading";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";

const Product = () => {
  const dispatch = useDispatch();
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [departureList, setDepartureList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [productSorting, setProductSorting] = useState([]);
  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // số tour / 1 trang
  const [activeFilter, setActiveFilter] = useState("");
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const filterProducts = useSelector((state) => state.products.filterProducts);

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const departure = (value) => {
    const result = products.filter((p) => p.departure === value);
    setDepartureList(result);
    setActiveFilter("departure");
  };

  const destination = (value) => {
    const result = products.filter((p) =>
      p.destination.toLowerCase().includes(value.toLowerCase())
    );
    setDestinationList(result);
    setActiveFilter("destination");
  };

  const handleFilterRadio = (id) => {
    console.log("dispatch filter id =", id);
    const category = tourOptions.find((option) => option.id === id);
    setCategoryTitle(category.name);
    setCategoryId(id);
    dispatch(fetchFilterProducts({ id }));
    setActiveFilter("filter");
  };

  const placeOptions =
    categoryId === 1
      ? PlaceOptions
      : categoryId === 2
      ? PlaceOptions2
      : PlaceOptions;

  let finalData = [];
  let finalTitle = "";

  if (activeFilter === "filter") {
    // ƯU TIÊN FILTERPRODUCTS
    if (filterProducts.length === 0) {
      finalData = [];
      finalTitle = "Không có tour nào";
    } else {
      const combined =
        departureList.length > 0
          ? filterProducts.filter((p) =>
              departureList.some((d) => d.id === p.id)
            )
          : filterProducts;

      finalData = combined;
      finalTitle = categoryTitle;

      if (combined.length === 0) {
        finalTitle = "Không có tour nào";
      }
    }
  } else if (activeFilter === "departure") {
    // ƯU TIÊN DEPARTURELIST
    if (departureList.length === 0) {
      finalData = [];
      finalTitle = "Không có tour nào";
    } else {
      const combined =
        filterProducts.length > 0
          ? departureList.filter((p) =>
              filterProducts.some((f) => f.id === p.id)
            )
          : departureList;

      finalData = combined;
      finalTitle = "Tour theo điểm khởi hành";

      if (combined.length === 0) {
        finalTitle = "Không có tour nào";
      }
    }
  } else if (activeFilter === "destination") {
    // ƯU TIÊN DESTINATION
    if (destinationList.length === 0) {
      finalData = [];
      finalTitle = "Không có tour nào";
    } else {
      let combined = destinationList;

      if (departureList.length > 0) {
        combined = combined.filter((p) =>
          departureList.some((d) => d.id === p.id)
        );
      }

      if (filterProducts.length > 0) {
        combined = combined.filter((p) =>
          filterProducts.some((f) => f.id === p.id)
        );
      }

      finalData = combined;
      finalTitle = "Tour theo điểm đến";

      if (combined.length === 0) {
        finalTitle = "Không có tour nào";
      }
    }
  } else {
    finalData = products;
    finalTitle = "Tour Du Lịch";
  }

  const sortByPrice = (data, value) => {
    return [...data].sort((a, b) => {
      if (value === "asc") return a.price - b.price; // Thấp → Cao
      if (value === "desc") return b.price - a.price; // Cao → Thấp
      return 0; //không thay đổi vị trí của 2 phần tử cần so sánh
    });
  };

  const handleSort = (value) => {
    let sorted = [];

    if (finalData.length > 0) {
      sorted = sortByPrice(finalData, value);
    } else {
      sorted = sortByPrice(products, value);
    }

    setProductSorting(sorted);
  };

  //Phân trang
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = finalData.slice(indexOfFirst, indexOfLast); 

  return (
    <div className="mx-4 my-6 md:mx-20 md:my-10">
      {loading && <LoadingSpinner />}
      {/* Khi đang load nó sẽ hiển thị loading */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* FILTER */}
        <div className="w-full md:w-1/3">
          <RevealOnScroll>
            <Filter
              handleFilterRadio={handleFilterRadio}
              departure={departure}
              destination={destination}
              options={placeOptions}
            />
          </RevealOnScroll>
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full md:w-2/3">
          <RevealOnScroll>
            <div className="mb-6">
              <img
                src="https://www.luavietours.com/wp/wp-content/uploads/2025/05/uu-dai-pc.jpg"
                alt=""
                className="w-full object-cover"
              />
            </div>
          </RevealOnScroll>
          <div>
            <RevealOnScroll delay={100}>
              {finalData.length > 0 ? (
                <TourCategory
                  title={finalTitle || "Tour Du Lịch"}
                  data={
                    productSorting.length > 0
                      ? productSorting.slice(indexOfFirst, indexOfLast)
                      : currentData
                  }
                  handleSort={handleSort}
                />
              ) : (
                <p className="text-center text-gray-500 py-10 text-lg">
                  Không có tour nào phù hợp
                </p>
              )}
            </RevealOnScroll>
          </div>

          {/* Button phân trang */}
          <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border"
            >
              Trước
            </button>

            <span>
              {currentPage} / {Math.ceil(finalData.length / itemsPerPage)}
            </span>

            <button
              disabled={
                currentPage === Math.ceil(finalData.length / itemsPerPage)
              }
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
