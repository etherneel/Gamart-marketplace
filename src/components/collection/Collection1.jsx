import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getMarketingItems } from "../../hooks/action";
const CardItems = [
  {
    description: "dddddddddddd",
    image:
      "https://ipfs.io/ipfs/QmNbKsDm9tFqh8ETDCG1K2UR7rCD1EGB2RLK6ACmBPxqb5",
    owner: "0x923561EE12Df22b69230a3F963AB6283eC076D84",
    price: "1",
    title: "dddddddddd",
    tokenID: 12,
    tokenURI:
      "https://ipfs.io/ipfs/QmfEjcKRdTcfpJXP8DesWiKfAT956ptXedd7yxrcG8R4Y7",
  },
  {
    description: "test me 2",
    image:
      "https://ipfs.io/ipfs/QmYFQKAWgf9shjNm5CetXz2r1vJ5FHd1FXaWh4votXNSN4",
    owner: "0x398818ca588209Fec5348e6CA901629C553c902E",
    price: "1",
    title: "tets me",
    tokenID: 104,
    tokenURI:
      "https://ipfs.io/ipfs/QmWv7A7MKozjSrpUBdpZzGhskKAkNkjrP1DTRgLLrg253K",
  },
  {
    description: "bape nft art",
    image:
      "https://ipfs.io/ipfs/QmSuPGnpmY8FD7tzEN5k7ynWetvSi7vcFvQvDGSkSgU4s3",
    owner: "0xE62e1503D5ef5B405443860490acA5Eacb15ebEe",
    price: "1",
    title: "mybape",
    tokenID: 65,
    tokenURI:
      "https://ipfs.io/ipfs/QmaywVHofpBmNSpTq4NG3SH1qwGHJaaimtFH6xke7XrDzD",
  },
  {
    description: "Test NFT for demo ",
    image:
      "https://ipfs.io/ipfs/QmQndEUEuUu43QTwSGKmC4AGL7Wc6J99Kqvc62Nqbq2Lw3",
    owner: "0x398818ca588209Fec5348e6CA901629C553c902E",
    price: "1",
    title: "test syed",
    tokenID: 94,
    tokenURI:
      "https://ipfs.io/ipfs/QmUhxMvf5hfWSfWfgZHdAD2Dei1e4yhiRZEEd4dxg2vtyF",
  },
  {
    description: "test",
    image:
      "https://ipfs.io/ipfs/QmfQ5BtCdG1634ZhXQZhYRN33bKvShJCW7fpHLvbFv5b5m",
    owner: "0x398818ca588209Fec5348e6CA901629C553c902E",
    price: "1",
    title: "test",
    tokenID: 54,
    tokenURI:
      "https://ipfs.io/ipfs/QmaiBRqV5ByQ4FSAHLkrhrpXWNPRuqi9LP61mNetyPxa1r",
  },
  {
    description: "215 289 085",
    image:
      "https://ipfs.io/ipfs/QmeY2AaX2eNqxkf8N7EwWiq1JkUCytxMj6crBrKmqgoqCn",
    owner: "0x398818ca588209Fec5348e6CA901629C553c902E",
    price: "1",
    title: "g215 289 085",
    tokenID: 70,
    tokenURI:
      "https://ipfs.io/ipfs/QmWLNpT1VGD5dfNH9mGR7Y3a5Hshp1grat64yDeB5J5dSp",
  },
  {
    description: "football game",
    image:
      "https://ipfs.io/ipfs/Qmdt44FywbtR6CXGwXVB96anbuG9PQ6psC129kyHh1pu1X",
    owner: "0xfDa4dc8B69161F51484Fb58Ca8c07a6ADe510f69",
    price: "1",
    title: "football",
    tokenID: 17,
    tokenURI:
      "https://ipfs.io/ipfs/QmceUUPemGSA5vPZvEQGpM9ZLYHzFJdj2BXSK9aAvVevGk",
  },
];
const Collection1 = () => {
  const { connected, connect, provider, address } = useWeb3Context();
  const networkId = useSelector((state) => state.network?.networkId) | 97;
  const ref = useRef();

  let [marketingItems, setMarketingItems] = useState([]);
  useEffect(() => {
    if (connected) {
      async function fetchData() {
        const _marketingItems = await getMarketingItems(provider, networkId);
        setMarketingItems(_marketingItems);
      }
      fetchData();
    }
  }, [connected, address]);
  return (
    <div>
      <div className="section mt-100" style={{ minHeight: 400 }}>
        <div className="container">
          <div className="section__head">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="section__title"> Collections</h2>
              <Link to="collections" className="btn btn-dark btn-sm">
                View All
              </Link>
            </div>
          </div>
          <div className="row  mb-30_reset">
            {CardItems.slice(4, 7).map((val, i) => {
              // console.log(`?tokenID=${val.tokenID}&tokenURI=${val.tokenURI}`);
              return (
                <div className="col-lg-4 col-md-6 col-sm-8" key={i}>
                  <div className="collections space-y-10 mb-30">
                    <div className="collections_item">
                      <Link
                        to={{
                          pathname: "/item-details",
                          search: `?tokenID=${val.tokenID}&tokenURI=${val.tokenURI}`,
                        }}
                        className="images-box space-y-10"
                      >
                        <div className="top_imgs">
                          <img src={val.image} alt="prv" />
                          <img src={val.image} alt="prv" />
                          <img src={val.image} alt="prv" />
                        </div>
                        <img
                          src={val.image}
                          alt="prv"
                          style={{ height: "315px" }}
                        />
                      </Link>
                    </div>
                    <div className="collections_footer justify-content-between">
                      <h5 className="collection_title">
                        <Link to="profile">{val.title}</Link>
                        <p>{val.description}</p>
                      </h5>
                      {/* <Link to="#" className="likes space-x-3">
                  <i className="ri-heart-3-fill" />
                  <span className="txt_md">{val.likes|0}k</span>
                </Link> */}
                    </div>
                    <div className="creators space-x-10">
                      <span className="color_text txt_md">Owner</span>
                      <div className="avatars space-x-5">
                        <Link to="profile">
                          <img
                            src={`img/logos/Logo.svg`}
                            alt="Avatar"
                            className="avatar avatar-sm"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection1;
