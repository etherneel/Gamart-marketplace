import React from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNetwork } from "../../slices/NetworkSlice";
import { useState } from "react";
import { getCollections } from "../../hooks/action";
import { shorten, trim } from "../../helpers";
// const CollectionItems = [
//   {
//     img1: "1",
//     img2: "2",
//     img3: "3",
//     img4: "4",
//     title: "Creative Art collection",
//     likes: "2.1",
//     stock: "5",
//     avatar_img: "1",
//     avatar_name: "william_jamy",
//   },
//   // {
//   //   img1: '5',
//   //   img2: '6',
//   //   img3: '7',
//   //   img4: '8',
//   //   title: 'Colorful Abstract collection',
//   //   likes: '3.5',
//   //   stock: '7',
//   //   avatar_img: '2',
//   //   avatar_name: 'alexis_fenn',
//   // },
//   // {
//   //   img1: '2',
//   //   img2: '6',
//   //   img3: '3',
//   //   img4: '7',
//   //   title: 'Photography Art collection',
//   //   likes: '7.2',
//   //   stock: '2',
//   //   avatar_img: '3',
//   //   avatar_name: 'Joshua_Bren',
//   // },
//   // {
//   //   img1: '1',
//   //   img2: '2',
//   //   img3: '3',
//   //   img4: '4',
//   //   title: 'Fantasy Art collection',
//   //   likes: '2.1',
//   //   stock: '5',
//   //   avatar_img: '4',
//   //   avatar_name: 'william_jamy',
//   // },
//   // {
//   //   img1: '5',
//   //   img2: '6',
//   //   img3: '7',
//   //   img4: '8',
//   //   title: 'Pop Art collection',
//   //   likes: '3.5',
//   //   stock: '7',
//   //   avatar_img: '5',
//   //   avatar_name: 'alexis_fenn',
//   // },
//   // {
//   //   img1: '2',
//   //   img2: '6',
//   //   img3: '3',
//   //   img4: '7',
//   //   title: 'Contemporary Art collection',
//   //   likes: '7.2',
//   //   stock: '2',
//   //   avatar_img: '6',
//   //   avatar_name: 'Joshua_Bren',
//   // },
// ];

function CollectionProfile() {
  const { connected, connect, provider, address } = useWeb3Context();
  const networkId = useSelector((state) => state.network?.networkId) | 97;
  let [collectionItems, setCollectionItems] = useState([]);
  // const [accountDetails, setAccountDetails] = useState({});
  const accountDetails = useSelector((state) => state.account.account);

  useEffect(() => {
    if (connected) {
      async function fetchData() {
        const _collectionItems = await getCollections(
          address,
          provider,
          networkId
        );
        setCollectionItems(_collectionItems);
      }
      fetchData();
    }
  }, [connected, address]);

  console.log(collectionItems);
  return (
    <div>
      <div className="row  mb-30_reset">
        {collectionItems.map((val, i) => {
          return (
            <div className="col-lg-6 col-md-6 col-sm-8" key={i}>
              <div className="collections space-y-10 mb-30">
                <Link
                  to={{
                    pathname: "/item-details",
                    search: `?tokenID=${val.tokenID}&tokenURI=${val.tokenURI}`,
                  }}
                >
                  <div className="collections_item">
                    <div className="top_imgs">
                      <img src={val.image} alt="prv" />
                      <img src={val.image} alt="prv" />
                      <img src={val.image} alt="prv" />
                    </div>
                    <img src={val.image} alt="prv" />
                  </div>
                </Link>
                <div className="collections_footer justify-content-between">
                  <h5 className="collection_title">
                    <Link to="profile">{val.title}</Link>
                  </h5>
                  {/* <Link to="#" className="likes space-x-3">
                  <i className="ri-heart-3-fill" />
                  <span className="txt_md">{val.likes}k</span>
                </Link> */}
                </div>
                <div className="creators space-x-10">
                  <span className="color_text txt_md">Owner</span>
                  <div className="avatars space-x-5">
                    <Link to="profile">
                      <img
                        src={
                          accountDetails.picUrl
                            ? accountDetails.picUrl
                            : `img/avatars/avatar_${val.avatar_img}.png`
                        }
                        alt="Avatar"
                        className="avatar avatar-sm"
                      />
                    </Link>
                  </div>
                  <Link to="profile">
                    <p className="avatars_name txt_sm"> @{shorten(address)}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionProfile;
