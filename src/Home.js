import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import { ethers } from "ethers";

const Home = () => {

    const [privatekey, setPrivatekey] = useState("");
    //const [data, setData] = useState("");
    const navigate = useNavigate();
    
    const handlePrivatekeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrivatekey(event.target.value);
    };
   

    const handleSubmit = () => {

        if(privatekey.trim()!=="") {

            alert("Success");
            const provider = new ethers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/Vu04GQ4-aSH7QETr8W1iKRQqW8-DShpP`);
            const wallet = new ethers.Wallet(privatekey);
            const account = wallet.connect(provider);
            const address = wallet.address;
            alert(`Wallet account: ${account} Wallet Address:${address}`);
            //setData(account);
            navigate('/dashboard',{state:{account,privatekey}});

        } else {
            alert("Please enter the private key!");
        }

    }

    return(
      <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">AXEN AI</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Private Key' id='formControlLg' type='text' size="lg" value={privatekey} 
                onChange={handlePrivatekeyChange}/>
                <p>{privatekey}</p>
                {/* <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/> */}

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' id="connect-btn" onClick={handleSubmit}>CONNECT</MDBBtn>

              {/* <MDBBtn className="mb-4 px-5" color='dark' size='lg' id="connect-btn" onClick={connect}>CONNECT WALLET</MDBBtn> */}
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              {/* <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p> */}

              {/* <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div> */}

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    )
}

export default Home;