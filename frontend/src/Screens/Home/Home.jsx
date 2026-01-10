import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../redux/slices/productSlice";
import Banner from "../../components/Banner/Banner";
import TourList from "../../components/TourList/TourList";
import Destination from "../../components/Destination/Destination";
import News from "../../components/News/News";
import LoadingSpinner from "../../components/Loading/Loading";
import { fetchPost } from "../../redux/slices/postSlice";
import ContactPopup from "../../components/Popup/Popup";
import FilterHome from "../../components/FilterHome/FilterHome";

const Home = () => {
  const [hasFiltered, setHasFiltered] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filterProduct = useSelector((state) => state.products.filterHome);
  const posts = useSelector((state) => state.posts.posts);
  const featureProducts = products.filter(
    (product) => product.isfeatured === true
  );
  const category1Products = products.filter(
    (product) => product.categoryid === 1
  );
  const category2Products = products.filter(
    (product) => product.categoryid === 2
  );
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchPost());
  }, []);

  console.log("filterProduct", filterProduct);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {/* Khi đang load nó sẽ hiển thị loading */}
      <Banner />
      <FilterHome setHasFiltered={setHasFiltered} />
      {hasFiltered &&
        (filterProduct.length > 0 ? (
          <TourList title="Tour Theo Bộ Lọc" data={filterProduct.slice(0, 3)} />
        ) : (
          <p className="mt-6 text-center text-gray-500">
            Không có tour nào phù hợp với bộ lọc
          </p>
        ))}
      <TourList title={"Tour Nổi Bật"} data={featureProducts.slice(0, 3)} />
      <TourList
        title={"Tour Trong Nước"}
        data={category1Products.slice(0, 3)}
      />
      <TourList
        title={"Tour Ngoài Nước"}
        data={category2Products.slice(0, 3)}
      />
      <Destination />
      {/* <News posts={posts}/> */}
      <ContactPopup />
    </div>
  );
};

export default Home;
