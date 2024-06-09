import axios from "axios";
import { GetStaticPropsContext } from "next";
import { ChangeEvent, FC, useState } from "react";
import { Search } from "../utils/search";

interface indexItem {
  coins: string[];
}

const Index: FC<indexItem> = ({ coins }) => {
  const [show, setShow] = useState(false);
  const [searhCoins, setSearchCoins] = useState(coins);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCoins(Search(coins, e.target.value));
  };

  return (
    <>
      <header className="header">
        <h1>Logo</h1>
        <h2>DOGE $0.163</h2>
        <div className="coins">
          <p>BTC</p>
          <p>ETH</p>
          <p>XTZ</p>
        </div>
        <div className="search">
          <button className="search__button" onClick={() => setShow(!show)}>
            <img src="/search.png" alt="" />
            Search
          </button>
          {show ? (
            <>
              <div className="list">
                <div className="list__input">
                  <img src="/search.png" alt="" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handlerChange}
                  />
                </div>
                <div className="list__categories">
                  <span>
                    <img src="/favourite.png" alt="" />
                    <h6>Favourites</h6>
                  </span>
                  <h6>All coins</h6>
                </div>
                <div className="list__items">
                  {searhCoins.map((coin) => (
                    <div className="coin">
                      <img src="/star.png" alt="" />
                      <p>{coin}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  try {
    const response = await axios.get("https://api-eu.okotoki.com/coins");
    return {
      props: {
        coins: response.data, // Передача даних у компонент
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        coins: [], // Повернення пустого масиву у разі помилки
      },
    };
  }
}
