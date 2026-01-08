import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCategory from "../../components/TourCategory/TourCategory";
import Filter from "../../components/Filter/Filter";
import LoadingSpinner from "../../components/Loading/Loading";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import {
  fetchProduct,
  fetchFilterProducts,
} from "../../redux/slices/productSlice";
import { tourOptions, PlaceOptions, PlaceOptions2 } from "../../data/options";

const Product = () => {
  const dispatch = useDispatch();
  // State cho filter và phân trang
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [departureList, setDepartureList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");
  const itemsPerPage = 6;
  // Redux state
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const filterProducts = useSelector((state) => state.products.filterProducts);

  // Lấy danh sách sản phẩm khi mount
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Xử lý filter theo điểm khởi hành
  const handleDeparture = (value) => {
    const result = products.filter((p) => p.departure === value);
    setDepartureList(result);
    setActiveFilter("departure");
  };

  // Xử lý filter theo điểm đến
  const handleDestination = (value) => {
    const result = products.filter((p) =>
      p.destination.toLowerCase().includes(value.toLowerCase())
    );
    setDestinationList(result);
    setActiveFilter("destination");
  };

  // Xử lý filter theo loại tour
  const handleFilterRadio = (id) => {
    const category = tourOptions.find((option) => option.id === id);
    setCategoryTitle(category?.name || "");
    setCategoryId(id);
    dispatch(fetchFilterProducts({ id }));
    setActiveFilter("filter");
  };

  // Chọn option điểm đến theo loại tour
  const placeOptions =
    categoryId === 1
      ? PlaceOptions
      : categoryId === 2
      ? PlaceOptions2
      : PlaceOptions;

  // Tính toán dữ liệu hiển thị và tiêu đề
  let finalData = [];
  let finalTitle = "";
  if (activeFilter === "filter") {
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
      finalTitle = combined.length > 0 ? categoryTitle : "Không có tour nào";
    }
  } else if (activeFilter === "departure") {
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
      finalTitle =
        combined.length > 0 ? "Tour theo điểm khởi hành" : "Không có tour nào";
    }
  } else if (activeFilter === "destination") {
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
      finalTitle =
        combined.length > 0 ? "Tour theo điểm đến" : "Không có tour nào";
    }
  } else {
    finalData = products;
    finalTitle = "Tour Du Lịch";
  }

  // Sắp xếp theo giá
  const sortByPrice = (data, order) => {
    return [...data].sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      if (order === "desc") return b.price - a.price;
      return 0;
    });
  };

  const handleSort = (order) => {
    const sorted = sortByPrice(
      finalData.length > 0 ? finalData : products,
      order
    );
    setSortedProducts(sorted);
  };

  // Phân trang
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = finalData.slice(indexOfFirst, indexOfLast);

  return (
    <div className="mx-4 my-6 md:mx-20 md:my-10">
      {loading && <LoadingSpinner />}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Bộ lọc */}
        <div className="w-full md:w-1/3">
          <RevealOnScroll>
            <Filter
              handleFilterRadio={handleFilterRadio}
              departure={handleDeparture}
              destination={handleDestination}
              options={placeOptions}
            />
          </RevealOnScroll>
        </div>
        {/* Danh sách sản phẩm */}
        <div className="w-full md:w-2/3">
          <RevealOnScroll>
            <div className="mb-6">
              <img
                src="https://www.luavietours.com/wp/wp-content/uploads/2025/05/uu-dai-pc.jpg"
                alt="Ưu đãi tour du lịch"
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
                    sortedProducts.length > 0
                      ? sortedProducts.slice(indexOfFirst, indexOfLast)
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
          {/* Phân trang */}
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
