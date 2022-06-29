// Footer.js

import React, { Component } from 'react';

// import { Helmet } from 'react-helmet';

class Footer extends Component {

    componentDidMount() {

        //An array of assets
        let scripts = [
            // { src: "assets/libs/jquery/jquery.min.js" },
            // { src: "assets/libs/bootstrap/js/bootstrap.bundle.min.js" },
            // { src: "assets/libs/metismenu/metisMenu.min.js" },
            // { src: "assets/libs/simplebar/simplebar.min.js" },
            // { src: "assets/libs/node-waves/waves.min.js" },
            // { src: "assets/libs/jquery-sparkline/jquery.sparkline.min.js" },
            // { src: "assets/libs/raphael/raphael.min.js" },
            // { src: "assets/libs/morris.js/morris.min.js" },
            { src: "assets/js/pages/dashboard.init.js" },
            { src: "assets/js/app.js" }
        ]
        scripts.forEach(item => {
            const script = document.createElement("script")
            script.src = item.src
            script.async = true
            document.body.appendChild(script)
        })
    }

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            ©
                            <script>document.write(new Date().getFullYear())</script> Lexa <span
                                className="d-none d-sm-inline-block"> - Terakom.</span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer