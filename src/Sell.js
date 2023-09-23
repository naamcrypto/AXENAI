import React, { useState } from 'react';
import Web3 from 'web3';
import contractAbi from './erc20abi.json';

const Dashboardv1 = () => {
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('TOKEN_ADDRESS');
  const [slippage, setSlippage] = useState('');
  const [sender, setSender] = useState('SENDER_ADDRESS'); // Replace with your sender address
  const [chain, setChain] = useState('mainnet'); // Replace with your desired chain
  
  const provider = new Web3(Web3.givenProvider || "https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP");
  //provider.eth.getAccounts().then(console.log);

  const account = provider.eth.accounts.privateKeyToAccount("0x10167f3c50b3e823a8edb2d1f1c5b2c06cdf6c7189d045f2363554d0663eb17b");
  provider.eth.defaultAccount = account.address;
  console.log(account.address);
  
  const contractAddress="0xED59d7788F4d4e3d611EA3445A5b9678d22A13dd";
  const contract = new provider.eth.Contract(contractAbi, contractAddress);
//   const gasPrice = await provider.eth.getGasPrice();




  const buyTokenV2 = async () => {


    try {

      //const provider = new web3.provider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
    //   const chainDetail = getChain(chain);
    //   const web3 = new Web3(chainDetail[0]);
      const axenRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
      const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'; // goerli weth
      //const explorerUrl = chainDetail[7];

      const myAddress = sender;
      const gasPrice = await provider.eth.getGasPrice();
      const ethAmount = amount;
      const path = [wethAddress, tokenAddress];
      //const amountsOut = await getAmountsOut(parseInt(ethAmount), path, chain);
      //const amountOut = amountsOut[1];
      const slippageFloat = parseFloat(slippage) / 100;
      //const amountOutAfterSlippage = parseInt(amountOut - amountOut * slippageFloat);

      const nonce = await provider.eth.getTransactionCount(myAddress);

      let error = false;
      while (true) {
        try {
          const transaction = contract.methods.swapExactInputSinglebuy(tokenAddress, 0);
          const data = transaction.encodeABI();

          const tx = {
            from: myAddress,
            to: contractAddress,
            value: provider.utils.toWei('0.01', 'ether'),
            data: data,
            nonce: nonce,
            gas: 1000000,
            gasPrice: gasPrice,
          };

          const signedTx = await provider.eth.accounts.signTransaction(tx, '0x10167f3c50b3e823a8edb2d1f1c5b2c06cdf6c7189d045f2363554d0663eb17b');
        
          const txHash = await provider.eth.sendSignedTransaction(signedTx.rawTransaction);
          console.log('Transaction Hash:', txHash);
          break;
        } catch (e) {
          if (!error) {
            error = true;
            console.log(e);
          }
          console.log('Sleeping...');
          await sleep(3000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

//   // Mockup for the getAmountsOut and getChain functions
//   const getAmountsOut = async (ethAmount, path, chain) => {
//     // Implement your logic to get amountsOut
//     return [ethAmount, ethAmount];
//   };

//   const getChain = (chain) => {
//     // Implement your logic to get chain details
//     return [];
//   };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  return (
    <div>
      <h1>Token Swap</h1>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Slippage"
        value={slippage}
        onChange={(e) => setSlippage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sender Address"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Chain"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
      />
      <button onClick={buyTokenV2}>Buy Token</button>
    </div>

    
  );
};

export default Dashboardv1;