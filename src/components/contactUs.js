import React, { Component } from "react";

class contactUs extends Component {


    render() {
        return (
            <form id="contact-form" method="post" >
                <h4>Name:</h4>
                <input type="text" style="height:35px;" id="name-input" placeholder="Enter name here…" class="form-control" style="width:100%;" /><br />
                <h4>Phone:</h4>
                <input type="phone" style="height:35px;" id="phone-input" placeholder="Enter phone number" class="form-control" style="width:100%;" /><br />
                <h4>Email:</h4>
                <input type="email" style="height:35px;" id="email-input" placeholder="Enter email here…" class="form-control" style="width:100%;" /><br />
                <h4>How can we help you?</h4>
                <textarea id="description-input" rows="3" placeholder="Enter your message…" class="form-control" style="width:100%;"></textarea><br />
                <div class="g-recaptcha" data-sitekey="6Lc7cVMUAAAAAM1yxf64wrmO8gvi8A1oQ_ead1ys" class="form-control" style="width:100%;"></div>
                <button type="button" onClick="submitToAPI(event)" class="btn btn-lg" style="margin-top:20px;">Submit</button>
            </form>
        );
    }
}

export default contactUs;

