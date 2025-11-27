import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCategory from "../../components/TourCategory/TourCategory";
import { fetchProduct, fetchFilterProducts } from "../../redux/slices/productSlice";
import Filter from "../../components/Filter/Filter";
import { tourOptions } from "../../data/options";
import LoadingSpinner from "../../components/Loading/Loading";

const Product = () => {
  const dispatch = useDispatch();
  const [ categoryTitle, setCategoryTitle ] = useState("")
  const products = useSelector((state) => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const filterProducts = useSelector(
    (state) => state.products.filterProducts
  );

  const handleFilterRadio = (id) => {
    console.log("dispatch filter id =", id);
    //Cập nhật tên cho tour được filter bên dưới
    const category = tourOptions.find(option => option.id === id);
    setCategoryTitle(category.name)
    dispatch(fetchFilterProducts({ id }))
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);


  return (
    <div className="mx-20 my-10">
    {loading && <LoadingSpinner />}
    {/* Khi đang load nó sẽ hiển thị loading */}
      <div className="flex">
        <div className="w-1/3">
          <Filter handleFilterRadio={handleFilterRadio}/>
        </div>
        <div className="w-2/3">
          <div>
            <img
              src="https://www.luavietours.com/wp/wp-content/uploads/2025/05/uu-dai-pc.jpg"
              alt=""
            />
          </div>
          {filterProducts && filterProducts.length > 0 ? (
            <div>
              <TourCategory title={categoryTitle} data={filterProducts} />
            </div>
          ) : (
            <div>
              <TourCategory title={"Tour Du Lịch"} data={products} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
