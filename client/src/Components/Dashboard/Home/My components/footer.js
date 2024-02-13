import React from "react";
import './footer.css';
import ShardaLogo from '../Assets/shardalogo.png';
import SihLogo from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Assets/sihlogo-removebg-preview.png"
function Footer() {

  return <footer>
     <div class="contact-heading">
      
      <div className="sharda-logo">
            <img src={ShardaLogo}/>
            </div>
            <div className="contact">
      <h3>Contact Us</h3>
            <p>
              Contact us on the phone or email and we will get back 
              to you in 24 hours
            </p>
      </div>
      <div class="contact-info">
            <div class="contact-icon">
              <i class="fa-solid fa-phone"></i>
              +91 5412879309
            </div>

            <div class="contact-icon">
              <i class="fa-solid fa-envelope"></i>
              xyz@gmail.com
            </div> 
          </div>
            <div className="sih-logo">
              <img src={SihLogo}/>
            </div>
          </div>

          {/* <div class="socials">
            <a target="blank" href="https://www.facebook.com/"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
            <a target="blank" href="https://www.twitter.com"
              ><i class="fa-brands fa-twitter"></i
            ></a>
            <a target="blank" href="https://www.linkedin.com"
              ><i class="fa-brands fa-linkedin"></i
            ></a>
          </div>
         */}
    
     </footer>;
}

export default Footer;