import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCarousel from "../../components/CustomCarousel";
import ExploreMenu from "../../components/ExploreMenu";
import BestSold from "../../components/BestSold";
import TopDeals from "../../components/TopDeals";



const Home = () => {
    return (
        <>
            <Navbar />
            <CustomCarousel />
            <ExploreMenu />
            <BestSold />
            <TopDeals />
            <Footer />
        </>
    );
};

export default Home;