import { getLatestProductsAction } from "../(actions)/product/getLatestProductAction";
import HomeHeroes from "./_components/HomeHeroes";
import HomeInfoSlider from "./_components/HomeInfoSlider";
import LatestProducts from "./_components/LatestProducts";

export default async function Home() {
  const latestProducts = await getLatestProductsAction();
  return (
    <div>
      <HomeHeroes />
      <HomeInfoSlider />
      <LatestProducts latestProducts={latestProducts} />
    </div>
  );
}
