import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Metaplex, keypairIdentity, bundlrStorage,walletAdapterIdentity } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { useState,useMemo } from "react";
import bs58 from 'bs58';
import { MetaplexProvider } from './MetaplexProvider';
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
  WalletName,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"));

const wallsecretkey='2usWBAdNydkUcLsAqFrddanyyDgfXkVCbDu4awyLwuP6ARGEqYwnuyWfY2k37AmvmVoyzymV8gdgF1RFqtXdDtYA';


const byte_array = bs58.decode(wallsecretkey)
const keyPair = Keypair.fromSecretKey(new Uint8Array(byte_array));

const newAuthority = Keypair.fromSecretKey(new Uint8Array(byte_array));
const myCustomAuthority = Keypair.fromSecretKey(new Uint8Array(byte_array));

// const myCustomToken = splToken.Token.createMint(connection, keyPair, keyPair.publicKey, null, 9, splToken.TOKEN_PROGRAM_ID)
// console.log("myCustomToken",myCustomToken);

export default function Home() {
  
const mx = Metaplex.make(connection).use(keypairIdentity(keyPair))
.use(bundlrStorage());




  const [address, setAddress] = useState(
    "5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe"
  );
  // console.log('new PublicKey(address)',new PublicKey(address).toBase58(),mx.identity().publicKey.toBase58())
  const [nft, setNft] = useState(null);

  const fetchNft = async () => {
    const asset = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });

    setNft(asset);
    console.log('asset',asset);
  };
  const pub = new PublicKey('5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe');
  
  
  const fetchNftbyowner = async () => {
  const myNfts = await mx.nfts().findAllByOwner({
    owner: pub
    });

    console.log('myNfts',myNfts[0].creators[0].address.toBase58());
};

const fetchNftbycreator = async () => {
  const myNfts = await mx.nfts().findAllByCreator({
    creator: pub
    });

    console.log('findAllByCreator',myNfts);
};




const Nft_create = async () => {
  // const { nft } = await mx.nfts().create({
  await mx.nfts().create({
    uri: "https://media.istockphoto.com/photos/beautiful-morning-light-in-public-park-with-green-grass-field-picture-id841278554",
    name: "Myak_test_NFT_22Feb23_2",
    sellerFeeBasisPoints: 500, // Represents 5.00%.
  }).then((res)=>{
    console.log('nftres',res);
  }).catch((err)=>{
    console.log('err',err);
   
  });
};



const mint = async () => {
  // const { nft } = await mx.nfts().create({

    const { nft: printedNft } = await mx.nfts().mint({
      nftOrSft: "CysFNtV6tN75YMEuxAVhnGs5rp6dC4ZYgUXiqknAs3n8",
      toOwner:"CysFNtV6tN75YMEuxAVhnGs5rp6dC4ZYgUXiqknAs3n8",
      amount: 1,
  });
  console.log('nprintedNftft',printedNft);
  //   await mx.nfts().printNewEdition({
  //     originalMint:"CysFNtV6tN75YMEuxAVhnGs5rp6dC4ZYgUXiqknAs3n8"   
  // }).then((res)=>{
  //   console.log('nftres',res);
  // }).catch((err)=>{
  //   console.log('err',err);
   
  // });
};


//console.log("newAuthority",newAuthority);
const Nft_creatauctionhousee = async () => {
  const myCustomAuthority = Keypair.generate();

//   await mx.auctionHouse().create({ sellerFeeBasisPoints: 500 })
//   .then((res)=>{
//     console.log('res',res);
//   }).catch((err)=>{
//     console.log('err',err);
//   });
// console.log("auctionHouseSettings",auctionHouseSettings);


// by address
const auctionHouse = await mx
    .auctionHouse()
    .findByAddress({ address: new PublicKey("5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe") });
console.log("auctionHouse",auctionHouse);


const { listing, sellerTradeState } = await mx
.auctionHouse()
.list({
  auctionHouse,
  seller: mx.identity(),  
  authority: wallet.publicKey,
  auctioneerAuthority: wallet.publicKey,            
  tokenAccount: new PublicKey("G25A2F52Ui9tTG2yP6hGtV5FymEFpeciVH1ZgDsQEGxo"),
  mintAccount: new PublicKey("5NukYgkPdoEmBxV3YgcDiDZLUoJdRjJhXkxYMqHw6B2H"),
  price: 1
  // tokens: 1
})
console.log("auctionHouse123",listing);
// const { listing, sellerTradeState } = await mx
// .auctionHouse()
// .list({
//   auctionHouse,
//   seller: mx.identity(),  
//   authority:"5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe",             
//   tokenAccount: new PublicKey("CysFNtV6tN75YMEuxAVhnGs5rp6dC4ZYgUXiqknAs3n8"),
//   mintAccount: new PublicKey("DT2L7f1E8Bg4uWxPeeiAWsYXfNVi9brBQBeqdFZXMFVh"),
//   price: 1000000000,
//   tokens: 3
// })

const auctionHouse12 =await mx
    .auctionHouse()
    .list({
        printReceipt: true,
        authority:"5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe",
        price:5,
        bookkeeper: mx.identity()
    })
    console.log("auctionHouse12",auctionHouse12);


// by creator and mint
// in this example, we assume that the Auction House
// does not have Auctioneer enabled

// const currentAuthority = Keypair.generate();
// const newAuthority = Keypair.generate();
// const newFeeWithdrawalDestination = Keypair.generate();
// const newTreasuryWithdrawalDestination = Keypair.generate();
// console.log("newAuthority",myCustomAuthority);


// const withdrawFromFeeAccount = await mx
//     .auctionHouse()
//     .withdrawFromFeeAccount({
//         auctionHouse,
//         amount: 5
//     });
//     console.log("withdrawFromFeeAccount",withdrawFromFeeAccount);

// const updatedAuctionHouse = await mx
//     .auctionHouse()
//     .update({
//         auctionHouse,
//         authority: "5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe",
//         newAuthority: mx.identity(),
//         sellerFeeBasisPoints: 100,
//         requiresSignOff: true,
//         canChangeSalePrice: true,
//         feeWithdrawalDestination: "5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe",
//         treasuryWithdrawalDestination: "5Vah3ac6NLuiPBpTE9UANTw9RM6NcheYUwHdxULCRgSe"
//     });


//    console.log("updatedAuctionHouse",updatedAuctionHouse);

};



const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

const endpoint = useMemo(() => clusterApiUrl(network), [network]);

const wallets = useMemo(
  () => [
    new PhantomWalletAdapter({ network }),
    new GlowWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
  ],
  [network]
);

const handleChange = (event) => {
  switch (event.target.value) {
    case "devnet":
      setNetwork(WalletAdapterNetwork.Devnet);
      break;
    case "mainnet":
      setNetwork(WalletAdapterNetwork.Mainnet);
      break;
    case "testnet":
      setNetwork(WalletAdapterNetwork.Testnet);
      break;
    default:
      setNetwork(WalletAdapterNetwork.Devnet);
      break;
  }
};

  return (
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
    <div>
      <Head>
        <title>Metaplex and Next.js example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.App}>
        <div className={styles.container}>
          {/* <h1 className={styles.title}>NFT Mint Address</h1> */}
          <div className={styles.nftForm}>
          <WalletMultiButton />

            {/* <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            /> */}
             <button onClick={fetchNftbyowner}>Fetch</button>
             <button onClick={fetchNft}>Fetch data</button>
            <button onClick={fetchNftbycreator}>fetchNftbycreator</button>
            <button onClick={Nft_create}>Nft_create</button>
            <button onClick={mint}>Mint</button>
            <button onClick={Nft_creatauctionhousee}>AH</button>
            {/* <button onClick={connect}>connect dummy</button> */}
          </div>
          {nft && (
            <div className={styles.nftPreview}>
              <h1>{nft.name}</h1>
              <img
                src={nft.json.image}
                alt="The downloaded illustration of the provided NFT address."
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </WalletModalProvider>
    </WalletProvider>
      </ConnectionProvider>
  );
}

// import styles from '../styles/Home.module.css';
// import { useMemo, useState, useEffect } from 'react';
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import {
//   GlowWalletAdapter,
//   PhantomWalletAdapter,
//   SlopeWalletAdapter,
//   SolflareWalletAdapter,
//   TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import {
//   WalletModalProvider,
//   WalletMultiButton
// } from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';
// import { MetaplexProvider } from './MetaplexProvider';
// import { ShowNFTs } from './ShowNFTs';
// import '@solana/wallet-adapter-react-ui/styles.css';

// export default function Home() {

//   const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//   const wallets = useMemo(
//     () => [
//       new PhantomWalletAdapter(),
//       new GlowWalletAdapter(),
//       new SlopeWalletAdapter(),
//       new SolflareWalletAdapter({ network }),
//       new TorusWalletAdapter(),
//     ],
//     [network]
//   );

//   const handleChange = (event) => {
//     switch (event.target.value) {
//       case "devnet":
//         setNetwork(WalletAdapterNetwork.Devnet);
//         break;
//       case "mainnet":
//         setNetwork(WalletAdapterNetwork.Mainnet);
//         break;
//       case "testnet":
//         setNetwork(WalletAdapterNetwork.Testnet);
//         break;
//       default:
//         setNetwork(WalletAdapterNetwork.Devnet);
//         break;
//     }
//   };


//   return (
//     <div>
//       <ConnectionProvider endpoint={endpoint}>
//         <WalletProvider wallets={wallets} autoConnect>
//           <WalletModalProvider>
//             <MetaplexProvider>
//               <div className={styles.App}>
//                 <WalletMultiButton />
//                 <ShowNFTs onClusterChange={handleChange} />
//               </div>
//             </MetaplexProvider>
//           </WalletModalProvider>
//         </WalletProvider>
//       </ConnectionProvider>
//     </div>
//   );


// }

