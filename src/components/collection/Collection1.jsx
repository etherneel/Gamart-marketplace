import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getMarketingItems } from "../../hooks/action";
const CollectionItems = [
  {
    img1: "9",
    img2: "10",
    img3: "11",
    img4: "12",
    title: "Creative Art collection",
    likes: "2.1",
    stock: "5",
    avatar_img: "2",
    avatar_name: "william_jamy",
  },
  // {
  //   img1: '13',
  //   img2: '14',
  //   img3: '15',
  //   img4: '16',
  //   title: 'Colorful Abstract Painting',
  //   likes: '3.5',
  //   stock: '7',
  //   avatar_img: '3',
  //   avatar_name: 'alexis_fenn',
  // },
  // {
  //   img1: '17',
  //   img2: '18',
  //   img3: '19',
  //   img4: '20',
  //   title: 'Modern Art collection',
  //   likes: '7.2',
  //   stock: '2',
  //   avatar_img: '1',
  //   avatar_name: 'Joshua_Bren',
  // },
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
            {marketingItems.slice(4, 7).map((val, i) => {
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
                        <img src={val.image} alt="prv" />
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
