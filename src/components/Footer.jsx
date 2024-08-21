import footerLogo from 'src/assets/images/footer-logo.png';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-text">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ft-about">
                                <div className="logo">
                                    <a href="#">
                                        <img src={footerLogo} alt="" />
                                    </a>
                                </div>
                                <p>Chúng tôi truyền cảm hứng và tiếp cận hàng triệu khách du lịch</p>
                                <div className="fa-social">
                                    <a href="#">
                                        <i className="fa fa-facebook" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-twitter" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-tripadvisor" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-instagram" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-youtube-play" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div className="ft-contact">
                                <h6>Contact Us</h6>
                                <ul>
                                    <li>0387753709</li>
                                    <li>sonahotelluxury@gmail.com</li>
                                    <li>44 Đường Trần Thái Tông, Cầu giấy, Hà Nội</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div className="ft-newslatter">
                                <h6>New latest</h6>
                                <p>Nhận các bản cập nhật và ưu đãi mới nhất.</p>
                                <form action="#" className="fn-form">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit">
                                        <i className="fa fa-send" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
