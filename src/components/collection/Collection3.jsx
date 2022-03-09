import React from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNetwork } from "../../slices/NetworkSlice";
import { useState } from "react";
import { getCollections, getAccountDetails } from "../../hooks/action";
import { shorten, trim } from "../../helpers";

function Collection3() {
  const { connected, connect, provider, address } = useWeb3Context();
  const networkId = useSelector((state) => state.network?.networkId) | 97;
  let [collectionItems, setCollectionItems] = useState([]);
  // const [accountDetails, setAccountDetails] = useState({});
  const accountDetails = useSelector((state) => state.account.account);
  const idToHexString = (id) => {
    return "0x" + id.toString(16);
  };
  const dispatch = useDispatch();
  // useEffect(async () => {
  //   if(connected){
  //     const id = await provider.getNetwork().then(network => network.chainId);
  //     if(id!=97){
  //       await provider.send("wallet_switchEthereumChain", [{ chainId: idToHexString(97) }]);
  //     }
  //   }else{
  //     connect().then(async() => {
  //       const id = await provider.getNetwork().then(network => network.chainId);
  //       if(id!=97){
  //         await provider.send("wallet_switchEthereumChain", [{ chainId: idToHexString(97) }]);
  //       }
  //     });
  //   }
  // }, []);

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
  console.log("collectionItems", collectionItems);
  return (
    <div>
      <div className="row justify-content-center mb-30_reset">
        {collectionItems.map((val, i) => {
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
                        src={
                          accountDetails.picUrl
                            ? accountDetails.picUrl
                            : `img/avatars/avatar_${val.avatar_img | "2"}.png`
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

export default Collection3;
