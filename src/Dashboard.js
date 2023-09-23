import {React,useState} from "react";
import {useLocation} from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
  }
  from 'mdb-react-ui-kit';
  import { ethers } from "ethers";
  import contractAbi from './erc20abi.json';
  import UniswapV3Factory from './UniswapV3Factory.json';

const Dashboard = () => {

  
    
    const factoryAddressV3 = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    const swapRouterV3 = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const contractAddress="0xED59d7788F4d4e3d611EA3445A5b9678d22A13dd";
    /***********************************/
    const provider = new ethers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);

    const tokenAddress1 = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // goerli uni
    const tokenAddress2 = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";
    const wethAddress1 = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'; // goerli weth

    const factoryContract = new ethers.Contract(factoryAddressV3,UniswapV3Factory,provider);
    factoryContract.getPool(wethAddress1,tokenAddress2,3000).then(poolAddress => console.log("poolAddress==>"+poolAddress));
    /***********************************/

    const location = useLocation();
    const address = location.state.account.address;
    const privatekey = location.state.privatekey;
    //console.log(address);

    const [tokenAddress, setTokenAddress] = useState("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
    const [amount, setAmount] = useState("0");

    /*Inputs*/
    //const tokenAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // goerli uni
    const buyAmount = ethers.parseUnits(amount, 'ether'); //default '0.001'
    /*Inputs*/

    const handleTokenAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenAddress(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'; // goerli weth
    //const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // mainnet weth
    const routerAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // Uniswap Router
    const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'; // Uniswap Quoter
    
    // const fee = 3000; // Uniswap pool fee bps 500, 3000, 10000
    /* global BigInt */
    // const targetPrice = BigInt(35); // target exchange rate
    // const targetAmountOut = buyAmount * targetPrice;
    // const sellAmount = buyAmount / targetPrice;
    // const tradeFrequency = 3600 * 1000; // ms (once per hour)

    // const provider = new ethers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
    // const wallet = new ethers.Wallet(privatekey);
    // const account = wallet.connect(provider);
    //alert(`Wallet account: ${account}`);

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {

         let action = event.target.value;
         alert(action);

         if(tokenAddress!==0 && amount!==0 && action!=="") {

              /*Abi function*/
              // const loadData = async () => {
              //   const provider = new ethers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
              //   const wallet = new ethers.Wallet(privatekey);
              //   const account = wallet.connect(provider);
              //   const address = wallet.address;
              //   alert(`Wallet account: ${account} Wallet Address:${address}`);
              //   const contract = new ethers.Contract(contractAddress,contractAbi,provider);
              // }

              // const token = new ethers.Contract(
              //   tokenAddress,
              //   [
              //     'function approve(address spender, uint256 amount) external returns (bool)',
              //     'function allowance(address owner, address spender) public view returns (uint256)',
              //   ],
              //   account
              // );
              
              // const router = new ethers.Contract(
              //   routerAddress,
              //   ['function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)'],
              //   account
              // );
              
              // const quoter = new ethers.Contract(
              //   quoterAddress,
              //   ['function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public view returns (uint256 amountOut)'],
              //   account
              // );

              // const buyTokens = async () => {
              //   console.log('Buying Tokens')
              //   const deadline = Math.floor(Date.now() / 1000) + 600;
              //   const tx = await router.exactInputSingle([wethAddress, tokenAddress, fee, wallet.address, deadline, buyAmount, 0, 0], {value: buyAmount});
              //   await tx.wait();
              //   console.log(tx.hash);
              //   if(tx)
              //   {
              //     console.log("Buyed Successfully");
              //     setTitle("Transaction Details");
              //     setMessage("Buyed Successfully "+tx.hash);
              //     toggleShow();
              //   }
              // }
              
              // const sellTokens = async () => {
              //   console.log('Selling Tokens')
              //   const allowance = await token.allowance(wallet.address, routerAddress);
              //   console.log(`Current allowance: ${allowance}`);
              //   if (allowance < sellAmount) {
              //     console.log('Approving Spend (bulk approve in production)');
              //     const atx = await token.approve(routerAddress, sellAmount);
              //     await atx.wait();
              //   }
              //   const deadline = Math.floor(Date.now() / 1000) + 600;
              //   const tx = await router.exactInputSingle([tokenAddress, wethAddress, fee, wallet.address, deadline, sellAmount, 0, 0]);
              //   await tx.wait();
              //   console.log(tx.hash);
              // }
        
              const checkPriceBuy = async () => {

                const provider = new ethers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
                const wallet = new ethers.Wallet(privatekey);
                const account = wallet.connect(provider);
                const address = wallet.address;
                alert(`Wallet account: ${account} Wallet Address:${address}`);
                const contract = new ethers.Contract(contractAddress, contractAbi, provider);
                //const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
                const amount1 = ethers.parseEther(amount);
                const tx = await contract.swapExactInputSinglebuy(tokenAddress, 0);

                const txResponse = await tx.wait();
          
                if (txResponse.status === 1) {
                  console.log('Transaction successful');
                } else {
                  console.log('Transaction failed');
                }
                //Convert BigNumber balance to a readable string
                //console.log(`Balance: ${balance} tokens`);

              }
              
              // const checkPriceSell = async () => {
              //   const amountOut = await quoter.quoteExactInputSingle(wethAddress, tokenAddress, fee, buyAmount, 0);
              //   console.log(`Current Exchange Rate: ${amountOut.toString()}`);
              //   console.log(`Target Exchange Rate: ${targetAmountOut.toString()}`);
              //   if (amountOut > targetAmountOut) sellTokens();
              // }

              if(action==="buy") {

                checkPriceBuy();

              } else if(action==="sell") {
                //checkPriceSell();
              } else {
                alert("Somwthing went wrong!!!");
              }

         } else {
            alert("Please fill valid inputs!!!");
         }

    };

    const [basicModal, setBasicModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const toggleShow = () => setBasicModal(!basicModal);

    return(
      <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{wordWrap:"break-word"}}>{message}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    <MDBContainer>

<div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

<MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>
    
    <h3 className="fw-bold mb-5">{address}</h3>
    <h2 className="fw-bold mb-5">Axen AI Bot</h2>

    <MDBInput wrapperClass='mb-4' label='Token Address' id='token_address' type='text' value={tokenAddress} onChange={handleTokenAddressChange}/>
    <MDBInput wrapperClass='mb-4' label='Amount' id='amount' type='text' value={amount} 
                onChange={handleAmountChange}/>
    <MDBBtn className='w-40 mb-4 btn-success' size='md' value="buy" onClick={handleSubmit}>Buy</MDBBtn>&nbsp;
    <MDBBtn className='w-40 mb-4 btn-danger' size='md' value="sell" onClick={handleSubmit}>Sell</MDBBtn>


  </MDBCardBody>
</MDBCard>

</MDBContainer>
        </>
    )
}

export default Dashboard;