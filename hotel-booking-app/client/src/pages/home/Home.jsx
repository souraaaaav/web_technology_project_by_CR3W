import { useEffect, useState } from "react";
import CR3WLogo from '../../components/CR3WLogo/CR3WLogo';
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    console.log(isLoading, 'before')
    setTimeout(() => setIsLoading(false), [3000])
    console.log(isLoading, 'after')

  }, [isLoading])
  return (

    <div>
      {
        isLoading ? <CR3WLogo /> :
          <>
            <Navbar />
            <Header />
            <div className="homeContainer">
              <Featured />
              <h1 className="homeTitle">Browse by property type</h1>
              <PropertyList />
              <h1 className="homeTitle">Homes guests love</h1>
              <FeaturedProperties />
              <MailList />
              <Footer />
            </div>
          </>
      }
    </div>
  );
};

export default Home;
