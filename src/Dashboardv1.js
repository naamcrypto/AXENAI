import React, { useState } from 'react';
import Web3 from 'web3';
import contractAbi from './erc20abi.json';
import tokenAbi from './tokenAbi.json';


const Dashboardv1 = () => {
  const [amount, setAmount] = useState('0.01');
  const [tokenAddress, setTokenAddress] = useState('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
  const [slippage, setSlippage] = useState('5');
  const [sender, setSender] = useState('0x2c1dA74C995235ff5730332338DCA47AbA974406'); // Replace with your sender address
  const [chain, setChain] = useState('mainnet'); // Replace with your desired chain
  
  const provider = new Web3(Web3.givenProvider || "https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP");
  //provider.eth.getAccounts().then(console.log);

  const account = provider.eth.accounts.privateKeyToAccount("0x10167f3c50b3e823a8edb2d1f1c5b2c06cdf6c7189d045f2363554d0663eb17b");
  provider.eth.defaultAccount = account.address;
  console.log(account.address);
  
  const contractAddress="0xED59d7788F4d4e3d611EA3445A5b9678d22A13dd";
  const contract = new provider.eth.Contract(contractAbi, contractAddress);
  const tokenContract = new provider.eth.Contract(tokenAbi, tokenAddress);
//   const gasPrice = await provider.eth.getGasPrice();
/* global BigInt */
  const sellTokenv3 = async () => {


    try {

      //const provider = new web3.provider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
    //   const chainDetail = getChain(chain);
    //   const web3 = new Web3(chainDetail[0]);
      const axenRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
      const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'; // goerli weth
      //const explorerUrl = chainDetail[7];

      const myAddress = sender;
      const gasPrice = await provider.eth.getGasPrice();
      const tokenDecimals = BigInt(await tokenContract.methods.decimals(tokenAddress).call()).toString(); // Replace with the actual decimal places of your token
      // console.log(tokenDecimals);
      const tokenAmount = BigInt(amount * 10 ** tokenDecimals).toString();

      console.log(tokenAmount);
      const path = [wethAddress, tokenAddress];

      
      //const amountsOut = await getAmountsOut(parseInt(ethAmount), path, chain);
      //const amountOut = amountsOut[1];
      const slippageFloat = parseFloat(slippage); // /100
      //const amountOutAfterSlippage = parseInt(amountOut - amountOut * slippageFloat);

      const approveTxLink = await approveToken(tokenAddress, sender, contractAddress,tokenAmount);
      console.log(approveTxLink);

      const nonce = await provider.eth.getTransactionCount(myAddress);

      let error = false;

      while (true) {
        try {

          // Contract method and parameters
            const transaction = contract.methods.swapExactInputSinglesell(tokenAddress,tokenAmount,0);
            const data = transaction.encodeABI();

            const tx = {
              from: myAddress,
              to:contractAddress,
              nonce: nonce,
              gas: 1000000,
              gasPrice: gasPrice,
              data:data
            };
  
            const signedTx = await provider.eth.accounts.signTransaction(tx, '0x10167f3c50b3e823a8edb2d1f1c5b2c06cdf6c7189d045f2363554d0663eb17b');
          
            const txHash = await provider.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log('Transaction Hash:', txHash);


        //   const transaction = contract.methods.swapExactInputSinglesell(tokenAddress,tokenAmount,slippageFloat).send({
        //     from: myAddress,
        //     nonce: nonce,
        //     gas: 1000000,
        //     gasPrice: gasPrice,
        //   });

        //   const transactionReceipt = await transaction.wait();

        //   const data = transaction.encodeABI();

        //   if (transactionReceipt.status !== true) {
        //     console.log('Transaction failed');
        //   }

        //   const txHash = transactionReceipt.transactionHash;
        // const sellTxLink = txHash;
        // const txResult = `Sell Txn hash: ${sellTxLink}`;
        // console.log(txResult);
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

  const approveToken = async (tokenAddress, sender, contractAddress, tokenAmount) => {
    try {
      const myAddress = sender;
      console.log("myAddress: " + myAddress);
      
  
      // Check if the allowance is already set
      // const allowance = await tokenContract.methods.allowance(myAddress, contractAddress).call();
  
      // console.log("allowance: " + allowance);
  
      // // Convert tokenAmount to a BigInt
      const tokenAmountBigInt = tokenAmount;
  
      // if (allowance >= tokenAmountBigInt) {
      //   console.log('Token already approved');
      //   return true;
      // }
  
      // Get the total supply of the token
      const tokenSupply = await tokenContract.methods.totalSupply().call();
  
      // Encode the data for the approve function
      const data = tokenContract.methods.approve(contractAddress, tokenAmountBigInt).encodeABI();
  
      // Get the nonce, gas price, and gas limit
      const nonce = await provider.eth.getTransactionCount(myAddress);
      const gasPrice = await provider.eth.getGasPrice();
      const gasLimit = 1000000; // Adjust the gas limit as needed
  
      // Create a transaction object
      const txObject = {
        nonce: nonce,
        gasLimit: provider.utils.toHex(gasLimit),
        gasPrice: provider.utils.toHex(gasPrice),
        from: myAddress,
        to:tokenAddress,
        data: data,
      };
  
      // Sign the transaction
      const signedTx = await provider.eth.accounts.signTransaction(txObject, '0x10167f3c50b3e823a8edb2d1f1c5b2c06cdf6c7189d045f2363554d0663eb17b'); // Replace with your private key
  
      // Send the signed transaction
      const txReceipt = await provider.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      // Transaction receipt
      console.log('Approval Transaction Hash:', txReceipt.transactionHash);
      console.log('Token Approved Successfully');

      

      
  
      // Return the transaction hash or any other relevant information
      return txReceipt.transactionHash;
      
    } catch (error) {
      console.error('Error:', error);
      return null;
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
      <button onClick={sellTokenv3}>Sell Token</button>
    </div>

    
  );
};

export default Dashboardv1;